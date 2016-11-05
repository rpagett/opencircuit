import Express from 'express';
import _ from 'lodash';
import multer from 'multer';
import path from 'path';

import Form from './FormModel';
import Organization from '../Organization/OrganizationModel';
import Unit from '../Unit/UnitModel';

import validateForm from './FormValidation';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

function deriveFileExtension(fname) {
  return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
}

function multerMiddleware(folder) {
  return multer({
    dest: 'files/' + folder + '/'
  })
}

function assignObligation(unit_id, form_id, due_date = Form.DUE_DATE()) {
  return Unit.findOneAndUpdate({ _id: unit_id, 'form_obligations.form': { $ne: form_id } }, {
    $addToSet: { form_obligations: {
      form: form_id,
      due_date
    }}
  })
}

Unit.on('afterInsert', newUnit => {
  const scholastic = newUnit.organization.is_school;

  function pushForm(form) {
    newUnit.form_obligations.push({
      form: form._id,
      due_date: form.due_date
    })
  }

  Form.find({ })
    .exec()
    .then(forms => {
      forms.map(form => {
        if (form.autoapply_all) {
          pushForm(form);
        }
        else if (scholastic && form.autoapply_scholastic) {
          pushForm(form);
        }
        else if (!scholastic && form.autoapply_independent) {
          pushForm(form);
        }
      })

      newUnit.save();
    })
})

let router = Express.Router();

router.route('/')
  .get(hasRole(UserRoles.FormsManager), (req, res) => {
    let forms = [ ];
    Form.find({ }, 'name')
      .populate('autoapply_classes')
      .exec()
      .then(formRes => {
        forms = formRes;
        return Unit.aggregate([
          {$match: {registered: true}},
          {$unwind: '$form_obligations'}, /* this converts arrays into unique documents for counting */
          {
            $group: {
              _id: '$form',
              count: {$sum: 1}
            }
          }
        ])
      })
      .then(agg => {
        console.log(agg);

        for (let key in forms) {
          const form = forms[key].toObject();

          let autoapply = 'None';
          if (form.autoapply_all) {
            autoapply = 'All';
          }
          else if (form.autoapply_scholastic) {
            autoapply = 'Scholastic Teams'
          }
          else if (form.autoapply_independent) {
            autoapply = 'Independent Teams'
          }
          else if (form.autoapply_classes) {
            autoapply = _.map(autoapply_classes, 'formattedName');
          }

          forms[key] = {
            ...form,
            assignedUnitCount: (agg[form._id] ? agg[form._id].count : 0),
            autoApplyList: autoapply
          }
        }

        res.json({
          success: true,
          contents: forms
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })

  .post(hasRole(UserRoles.FormsManager), multerMiddleware('form_templates').single('file'), (req, res) => {
    validateForm(req.body)
      .then(data => {
        let filename = data.name;
        if (!filename || filename == 'undefined' || typeof filename == 'undefined') {
          filename = req.file.originalname;
        }

        let form = new Form({
          name: filename,
          description: data.description,
          form_filename: req.file.filename,
          form_extension: deriveFileExtension(req.file.originalname),
          uploader: req.user._id,
          due_date: Form.DUE_DATE()
        })

        return form.save()
      })
      .then(form => {
        res.json({
          success: true,
        })
      })
      .catch(errors => {
        console.log('Errors');
        res.json({
          success: false,
        })
      })
  })

// For user submitting a completed form
router.post('/:id', multerMiddleware('form_uploads').single('file'), (req, res) => {
  let redirect = null;
  Unit.findOne({ _id: req.body.unit }, 'form_obligations')
    .populate('form_obligations.form')
    .exec()
    .then(unit => {
      if (!unit) {
        throw new Error('Unit not found.');
      }

      if (deriveFileExtension(req.file.originalname) != 'pdf') {
        throw new Error('Invalid file extension. Please supply a PDF.');
      }

      for (let key in unit.form_obligations) {
        const obl = unit.form_obligations[key];
        console.log('OBL OBL', obl);

        if (obl.form._id.toString() != req.params.id) {
          continue;
        }

        if (obl.approved) {
          throw new Error('Obligation has already been fulfilled and approved.')
        }

        unit.form_obligations[key].system_filename = req.file.filename;
        unit.form_obligations[key].extension = deriveFileExtension(req.file.originalname);
        redirect = obl._id;
        return unit.save();
      }

      throw new Error('Did not find matching form obligation.');
    })
    .then(() => {
      res.send({
        success: true,
        redirect: `/forms/verify/${redirect}`
      })
    })
    .catch(err => {
      console.log('TEMP1 e')
      res.send({
        success: false,
        error: err.message
      })
    })
})

router.get('/:id/download', (req, res) => {
  Form.findOne({ _id: req.params.id })
    .then(form => {
      if (!form) {
        throw new Error('Form not found.');
      }

      res.set('Content-disposition', 'attachment; filename=' + form.name + '.' + form.form_extension);
      res.sendFile(path.resolve(process.cwd(), 'files', 'form_templates', form.form_filename))
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(404);
    })
})

router.route('/:id/assign')

  .get(hasRole(UserRoles.FormsManager), (req, res) => {
    let obligations = [ ];
    Unit.find({ 'form_obligations.form': req.params.id }, 'name slug form_obligations')
      .populate('form_obligations.form')
      .sort('name')
      .exec()
      .then(units => {
        let obligations = [ ];

        units.map(unit => {
          unit.form_obligations.map(obl => {
            obligations.push({
              ...obl.toObject(),
              unit
            })
          })
        })

        res.send({
          success: true,
          contents: obligations
        })
      })
  })

  .post(hasRole(UserRoles.FormsManager), (req, res) => {
    assignObligation(req.body.unit, req.params.id, req.body.due_date)
      .then(unit => {
        res.send({
          success: true
        })
      })
      .catch(err => {
        res.send({
          success: false,
          error: err.message
        })
      })
  })


router.route('/:id/autoassign')
.get(hasRole(UserRoles.FormsManager), (req, res) => {
  Form.findOne({ _id: req.params.id })
    .then(form => {
      if (!form) {
        throw new Error('Form not found.');
      }

      let category = 'none';
      if (form.autoapply_all) {
        category = 'all';
      }
      else if (form.autoapply_scholastic) {
        category = 'scholastic';
      }
      else if (form.autoapply_independent) {
        category = 'independent';
      }

      res.send({
        success: true,
        model: {
          category
        }
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
})

.patch(hasRole(UserRoles.FormsManager), (req, res) => {
  const category = req.body.category;
  let filter = { };
  let resForm = { };
  Form.findOne({ _id: req.params.id })
    .then(form => {
      if (!form) {
        throw new Error('Form not found.');
      }
      resForm = form;

      if (category == 'all') {
        form.autoapply_all = true;
        form.autoapply_scholastic = false;
        form.autoapply_independent = false;
      }
      else if (category == 'scholastic') {
        form.autoapply_all = false;
        form.autoapply_scholastic = true;
        form.autoapply_independent = false;
        filter = {is_school: true};
      }
      else if (category == 'independent') {
        form.autoapply_all = false;
        form.autoapply_scholastic = false;
        form.autoapply_independent = true;
        filter = {is_school: false};
      }
      else {
        form.autoapply_all = false;
        form.autoapply_scholastic = false;
        form.autoapply_independent = false;
        filter = null;
      }

      return form.save()
    })
    .then(form => {
      if (filter) {
        return Organization.find(filter);
      }
      else {
        res.send({
          success: true
        })
      }
    })
    .then(orgs => {
      const ids = _.map(orgs, '_id');

      return Unit.update({ organization: { $in: ids }, 'form_obligations.form': { $ne: resForm._id } }, {
        $addToSet: {
          form_obligations: {
            form: resForm._id,
            due_date: resForm.due_date
          }
        }
      }, { multi: true })
    })
    .then( () => {
      res.send({
        success: true
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
})

router.route('/verify/:obl')
.get((req, res) => {
  Unit.findOne({'form_obligations._id': req.params.obl}, 'name form_obligations')
    .populate('form_obligations.form')
    .exec()
    .then(unit => {
      if (!unit) {
        throw new Error('Obligation not found.');
      }

      const obl = unit.form_obligations.find(req.params.obl);

      if (!obl.system_filename) {
        throw new Error('No form response.');
      }

      if (obl.submitted || obl.approved) {
        throw new Error('Already processed.')
      }

      res.json({
        success: true,
        contents: {
          unit,
          form: obl.form
        }
      })
    })
    .catch(err => {
      console.log(err.message);
      res.redirect(302, process.env.BASE_URL + '/');
    })
})

.post((req, res) => {
  Unit.findOneAndUpdate({'form_obligations._id': req.params.obl}, {'form_obligations.$.submitted': true })
    .then(unit => {
      res.send({
        success: true,
        redirect: unit.detailsUrl
      })
    })
    .catch(err => {
      console.log(err.message);
      res.send({
        success: false,
        redirect: '/'
      })
    })
})

router.get('/review', hasRole(UserRoles.FormsManager), (req, res) => {
  let obligations = [ ];
  Unit.find({'form_obligations.submitted': true, 'form_obligations.approved': { $in: [null, false] }},
    'name slug form_obligations')
    .populate('form_obligations.form')
    .sort('name')
    .exec()
    .then(units => {
      let obligations = [ ];

      units.map(unit => {
        unit.form_obligations.map(obl => {
          if (obl.submitted && !obl.approved) {
            obligations.push({
              ...obl.toObject(),
              unit
            })
          }
        })
      })

      res.send({
        success: true,
        contents: obligations
      })
    })
})

router.route('/review/:obl')
.post((req, res) => {
  Unit.findOneAndUpdate({'form_obligations._id': req.params.obl}, {'form_obligations.$.approved': true })
    .then(unit => {
      res.send({
        success: true,
        redirect: unit.detailsUrl
      })
    })
    .catch(err => {
      console.log(err.message);
      res.send({
        success: false,
        redirect: '/'
      })
    })
})

.delete((req, res) => {
  Unit.findOneAndUpdate({'form_obligations._id': req.params.obl}, {
    'form_obligations.$.system_filename': null,
    'form_obligations.$.extension': null,
    'form_obligations.$.submitted': false
  })
    .then(unit => {
      res.send({
        success: true,
        redirect: unit.detailsUrl
      })
    })
    .catch(err => {
      console.log(err.message);
      res.send({
        success: false,
        redirect: '/'
      })
    })
})

router.get('/submission/:obl', (req, res) => {
  Unit.findOne({ 'form_obligations._id': req.params.obl }, 'name form_obligations')
    .populate('form_obligations.form')
    .exec()
    .then(unit => {
      if (!unit) {
        throw new Error('Submission not found.');
      }

      const obl = unit.form_obligations.id(req.params.obl);

      res.set('Content-disposition', 'attachment; filename=' + obl.form.name + '.' + obl.extension);
      res.sendFile(path.resolve(process.cwd(), 'files', 'form_uploads', obl.system_filename))
    })
    .catch(err => {
      console.log(err.message);
      res.send(err.message);
    })
})

router.get('/forUnit/:id', (req, res) => {
  Unit.findOne({ _id: req.params.id, form_obligations: { $ne: null } }, 'name slug form_obligations')
    .sort('form_obligations.form')
    .populate('form_obligations.form')
    .exec()
    .then(unit => {
      if (!unit) {
        throw new Error('Unit not found.')
      }

      const obligations = [ ];

      if (unit.form_obligations) {
        for (let key in unit.form_obligations) {
          let obl = unit.form_obligations[key].toObject();

          obl = {
            ...obl,
            unit
          }

          obligations[key] = obl;
        }
      }

      res.send({
        success: true,
        contents: obligations
      })
    })
    .catch(err => {
      res.send({
        success: false,
        contents: [ ]
      })
    })
})

router.get('/forUser/:id', (req, res) => {
  let obligations = [ ]
  Unit.find({ director: req.params.id, form_obligations: { $ne: null } }, 'name slug form_obligations')
    .sort('form_obligations.form')
    .populate('form_obligations.form')
    .exec()
    .then(units => {
      units.map(unit => {
        unit.form_obligations.map(obl => {
          obligations.push({
            ...obl,
            unit
          });
        })
      })

      res.send({
        success: true,
        contents: obligations
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
})

export default router;