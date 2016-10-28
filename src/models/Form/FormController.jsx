import Express from 'express';
import _ from 'lodash';
import multer from 'multer';
import path from 'path';

import Form from './FormModel';
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

function assignObligation(unit_id, form_id, due_date = null) {
  return Unit.findOneAndUpdate({ _id: unit_id }, {
    $addToSet: { form_obligations: {
      form: form_id,
      due_date
    }}
  })
}

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
          uploader: req.user._id
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

router.post('/:id', multerMiddleware('form_uploads').single('file'), (req, res) => {
  Unit.findOne({ _id: req.body.unit }, 'form_obligations')
    .then(unit => {
      if (!unit) {
        throw new Error('Unit not found.');
      }

      if (deriveFileExtension(req.file.originalname) != 'pdf') {
        throw new Error('Invalid file extension. Please supply a PDF.');
      }

      for (let key in unit.form_obligations) {
        const obl = form_obligations[key];

        if (obl.form._id.toString() != req.params.id) {
          continue;
        }

        if (obl.approved) {
          throw new Error('Obligation has already been fulfilled and approved.')
        }

        obl.system_filename = req.file.filename;
        obl.extension = deriveFileExtension(req.file.originalname);
        return obl.save();
      }

      throw new Error('Did not find matching form obligation.');
    })
    .then(obl => {
      res.send({
        success: true,
        redirect: `/forms/verify/${obl._id}`
      })
    })
    .catch(err => {
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
    let selectedForm = { };
    Form.findOne({ _id: req.params.id })
      .then(form => {
        if (!form) {
          throw new Error('Form not found.');
        }

        selectedForm = form;

        return Unit.find({'form_obligations.form': req.params.id}, 'name slug')
          .sort('name')
          .exec()
      })
      .then(units => {
        for (let key in units) {
          let unit = units[key].toObject();

          units[key] = {
            ...unit,
            selectedForm
          }
        }

        res.send({
          success: true,
          contents: units
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
  Form.findOne({ _id: req.params.id })
    .then(form => {
      if (!form) {
        throw new Error('Form not found.');
      }

      const category = req.body.category;
      if (category == 'all') {
        form.autoapply_all = true;
        form.autoapply_scholastic = false;
        form.autoapply_independent = false;
      }
      else if (category == 'scholastic') {
        form.autoapply_all = false;
        form.autoapply_scholastic = true;
        form.autoapply_independent = false;
      }
      else if (category == 'independent') {
        form.autoapply_all = false;
        form.autoapply_scholastic = false;
        form.autoapply_independent = true;
      }
      else {
        form.autoapply_all = false;
        form.autoapply_scholastic = false;
        form.autoapply_independent = false;
      }

      return form.save()
    })
    .then(form => {
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

router.get('/verify/:obl', (req, res) => {

})

export default router;