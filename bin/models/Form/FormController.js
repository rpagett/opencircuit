'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _FormModel = require('./FormModel');

var _FormModel2 = _interopRequireDefault(_FormModel);

var _OrganizationModel = require('../Organization/OrganizationModel');

var _OrganizationModel2 = _interopRequireDefault(_OrganizationModel);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _FormValidation = require('./FormValidation');

var _FormValidation2 = _interopRequireDefault(_FormValidation);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deriveFileExtension(fname) {
  return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
}

function multerMiddleware(folder) {
  return (0, _multer2.default)({
    dest: 'files/' + folder + '/'
  });
}

function assignObligation(unit_id, form_id) {
  var due_date = arguments.length <= 2 || arguments[2] === undefined ? _FormModel2.default.DUE_DATE() : arguments[2];

  return _UnitModel2.default.findOneAndUpdate({ _id: unit_id, 'form_obligations.form': { $ne: form_id } }, {
    $addToSet: { form_obligations: {
        form: form_id,
        due_date: due_date
      } }
  });
}

_UnitModel2.default.on('afterInsert', function (newUnit) {
  var scholastic = newUnit.organization.is_school;

  function pushForm(form) {
    newUnit.form_obligations.push({
      form: form._id,
      due_date: form.due_date
    });
  }

  _FormModel2.default.find({}).exec().then(function (forms) {
    forms.map(function (form) {
      if (form.autoapply_all) {
        pushForm(form);
      } else if (scholastic && form.autoapply_scholastic) {
        pushForm(form);
      } else if (!scholastic && form.autoapply_independent) {
        pushForm(form);
      }
    });

    newUnit.save();
  });
});

var router = _express2.default.Router();

router.route('/').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  var forms = [];
  _FormModel2.default.find({}, 'name').populate('autoapply_classes').exec().then(function (formRes) {
    forms = formRes;
    return _UnitModel2.default.aggregate([{ $match: { registered: true } }, { $unwind: '$form_obligations' }, /* this converts arrays into unique documents for counting */
    {
      $group: {
        _id: '$form',
        count: { $sum: 1 }
      }
    }]);
  }).then(function (agg) {
    console.log(agg);

    for (var key in forms) {
      var form = forms[key].toObject();

      var autoapply = 'None';
      if (form.autoapply_all) {
        autoapply = 'All';
      } else if (form.autoapply_scholastic) {
        autoapply = 'Scholastic Teams';
      } else if (form.autoapply_independent) {
        autoapply = 'Independent Teams';
      } else if (form.autoapply_classes) {
        autoapply = _lodash2.default.map(autoapply_classes, 'formattedName');
      }

      forms[key] = _extends({}, form, {
        assignedUnitCount: agg[form._id] ? agg[form._id].count : 0,
        autoApplyList: autoapply
      });
    }

    res.json({
      success: true,
      contents: forms
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), multerMiddleware('form_templates').single('file'), function (req, res) {
  (0, _FormValidation2.default)(req.body).then(function (data) {
    var filename = data.name;
    if (!filename || filename == 'undefined' || typeof filename == 'undefined') {
      filename = req.file.originalname;
    }

    var form = new _FormModel2.default({
      name: filename,
      description: data.description,
      form_filename: req.file.filename,
      form_extension: deriveFileExtension(req.file.originalname),
      uploader: req.user._id,
      due_date: _FormModel2.default.DUE_DATE()
    });

    return form.save();
  }).then(function (form) {
    res.json({
      success: true
    });
  }).catch(function (errors) {
    console.log('Errors');
    res.json({
      success: false
    });
  });
});

// For user submitting a completed form
router.post('/:id', multerMiddleware('form_uploads').single('file'), function (req, res) {
  var redirect = null;
  _UnitModel2.default.findOne({ _id: req.body.unit }, 'form_obligations').populate('form_obligations.form').exec().then(function (unit) {
    if (!unit) {
      throw new Error('Unit not found.');
    }

    if (deriveFileExtension(req.file.originalname) != 'pdf') {
      throw new Error('Invalid file extension. Please supply a PDF.');
    }

    for (var key in unit.form_obligations) {
      var obl = unit.form_obligations[key];
      console.log('OBL OBL', obl);

      if (obl.form._id.toString() != req.params.id) {
        continue;
      }

      if (obl.approved) {
        throw new Error('Obligation has already been fulfilled and approved.');
      }

      unit.form_obligations[key].system_filename = req.file.filename;
      unit.form_obligations[key].extension = deriveFileExtension(req.file.originalname);
      redirect = obl._id;
      return unit.save();
    }

    throw new Error('Did not find matching form obligation.');
  }).then(function () {
    res.send({
      success: true,
      redirect: '/forms/verify/' + redirect
    });
  }).catch(function (err) {
    console.log('TEMP1 e');
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.get('/:id/download', function (req, res) {
  _FormModel2.default.findOne({ _id: req.params.id }).then(function (form) {
    if (!form) {
      throw new Error('Form not found.');
    }

    res.set('Content-disposition', 'attachment; filename=' + form.name + '.' + form.form_extension);
    res.sendFile(_path2.default.resolve(process.cwd(), 'files', 'form_templates', form.form_filename));
  }).catch(function (err) {
    console.log(err.message);
    res.sendStatus(404);
  });
});

router.route('/:id/assign').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  var obligations = [];
  _UnitModel2.default.find({ 'form_obligations.form': req.params.id }, 'name slug form_obligations').populate('form_obligations.form').sort('name').exec().then(function (units) {
    var obligations = [];

    units.map(function (unit) {
      unit.form_obligations.map(function (obl) {
        obligations.push(_extends({}, obl.toObject(), {
          unit: unit
        }));
      });
    });

    res.send({
      success: true,
      contents: obligations
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  assignObligation(req.body.unit, req.params.id, req.body.due_date).then(function (unit) {
    res.send({
      success: true
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.route('/:id/autoassign').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  _FormModel2.default.findOne({ _id: req.params.id }).then(function (form) {
    if (!form) {
      throw new Error('Form not found.');
    }

    var category = 'none';
    if (form.autoapply_all) {
      category = 'all';
    } else if (form.autoapply_scholastic) {
      category = 'scholastic';
    } else if (form.autoapply_independent) {
      category = 'independent';
    }

    res.send({
      success: true,
      model: {
        category: category
      }
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  var category = req.body.category;
  var filter = {};
  var resForm = {};
  _FormModel2.default.findOne({ _id: req.params.id }).then(function (form) {
    if (!form) {
      throw new Error('Form not found.');
    }
    resForm = form;

    if (category == 'all') {
      form.autoapply_all = true;
      form.autoapply_scholastic = false;
      form.autoapply_independent = false;
    } else if (category == 'scholastic') {
      form.autoapply_all = false;
      form.autoapply_scholastic = true;
      form.autoapply_independent = false;
      filter = { is_school: true };
    } else if (category == 'independent') {
      form.autoapply_all = false;
      form.autoapply_scholastic = false;
      form.autoapply_independent = true;
      filter = { is_school: false };
    } else {
      form.autoapply_all = false;
      form.autoapply_scholastic = false;
      form.autoapply_independent = false;
      filter = null;
    }

    return form.save();
  }).then(function (form) {
    if (filter) {
      return _OrganizationModel2.default.find(filter);
    } else {
      res.send({
        success: true
      });
    }
  }).then(function (orgs) {
    var ids = _lodash2.default.map(orgs, '_id');

    return _UnitModel2.default.update({ organization: { $in: ids }, 'form_obligations.form': { $ne: resForm._id } }, {
      $addToSet: {
        form_obligations: {
          form: resForm._id,
          due_date: resForm.due_date
        }
      }
    }, { multi: true });
  }).then(function () {
    res.send({
      success: true
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.route('/verify/:obl').get(function (req, res) {
  _UnitModel2.default.findOne({ 'form_obligations._id': req.params.obl }, 'name form_obligations').populate('form_obligations.form').exec().then(function (unit) {
    if (!unit) {
      throw new Error('Obligation not found.');
    }

    var obl = unit.form_obligations.find(req.params.obl);

    if (!obl.system_filename) {
      throw new Error('No form response.');
    }

    if (obl.submitted || obl.approved) {
      throw new Error('Already processed.');
    }

    res.json({
      success: true,
      contents: {
        unit: unit,
        form: obl.form
      }
    });
  }).catch(function (err) {
    console.log(err.message);
    res.redirect(302, process.env.BASE_URL + '/');
  });
}).post(function (req, res) {
  _UnitModel2.default.findOneAndUpdate({ 'form_obligations._id': req.params.obl }, { 'form_obligations.$.submitted': true }).then(function (unit) {
    res.send({
      success: true,
      redirect: unit.detailsUrl
    });
  }).catch(function (err) {
    console.log(err.message);
    res.send({
      success: false,
      redirect: '/'
    });
  });
});

router.get('/review', (0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  var obligations = [];
  _UnitModel2.default.find({ 'form_obligations.submitted': true, 'form_obligations.approved': { $in: [null, false] } }, 'name slug form_obligations').populate('form_obligations.form').sort('name').exec().then(function (units) {
    var obligations = [];

    units.map(function (unit) {
      unit.form_obligations.map(function (obl) {
        if (obl.submitted && !obl.approved) {
          obligations.push(_extends({}, obl.toObject(), {
            unit: unit
          }));
        }
      });
    });

    res.send({
      success: true,
      contents: obligations
    });
  });
});

router.route('/review/:obl').post(function (req, res) {
  _UnitModel2.default.findOneAndUpdate({ 'form_obligations._id': req.params.obl }, { 'form_obligations.$.approved': true }).then(function (unit) {
    res.send({
      success: true,
      redirect: unit.detailsUrl
    });
  }).catch(function (err) {
    console.log(err.message);
    res.send({
      success: false,
      redirect: '/'
    });
  });
}).delete(function (req, res) {
  _UnitModel2.default.findOneAndUpdate({ 'form_obligations._id': req.params.obl }, {
    'form_obligations.$.system_filename': null,
    'form_obligations.$.extension': null,
    'form_obligations.$.submitted': false
  }).then(function (unit) {
    res.send({
      success: true,
      redirect: unit.detailsUrl
    });
  }).catch(function (err) {
    console.log(err.message);
    res.send({
      success: false,
      redirect: '/'
    });
  });
});

router.get('/submission/:obl', function (req, res) {
  _UnitModel2.default.findOne({ 'form_obligations._id': req.params.obl }, 'name form_obligations').populate('form_obligations.form').exec().then(function (unit) {
    if (!unit) {
      throw new Error('Submission not found.');
    }

    var obl = unit.form_obligations.id(req.params.obl);

    res.set('Content-disposition', 'attachment; filename=' + obl.form.name + '.' + obl.extension);
    res.sendFile(_path2.default.resolve(process.cwd(), 'files', 'form_uploads', obl.system_filename));
  }).catch(function (err) {
    console.log(err.message);
    res.send(err.message);
  });
});

router.get('/forUnit/:id', function (req, res) {
  _UnitModel2.default.findOne({ _id: req.params.id }, 'name slug form_obligations').sort('form_obligations.form').populate('form_obligations.form').exec().then(function (unit) {
    if (!unit) {
      throw new Error('Unit not found.');
    }

    var obligations = [];

    for (var key in unit.form_obligations) {
      //let obl = unit.form_obligations[key].toObject();

      //if (!obl) { continue; }

      var obl = _extends({}, unit.form_obligations[key], {
        unit: unit
      });

      obligations[key] = obl;
    }

    res.send({
      success: true,
      contents: obligations
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.get('/forUser/:id', function (req, res) {
  var obligations = [];
  _UnitModel2.default.find({ director: req.params.id }, 'name slug form_obligations').sort('form_obligations.form').populate('form_obligations.form').exec().then(function (units) {
    units.map(function (unit) {
      for (var key in unit.form_obligations) {
        //let obl = unit.form_obligations[key].toObject();

        //if (!obl) { continue; }

        var obl = _extends({}, unit.form_obligations[key], {
          unit: unit
        });

        obligations.push(obl);
      }
    });

    res.send({
      success: true,
      contents: obligations
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

exports.default = router;
module.exports = exports['default'];