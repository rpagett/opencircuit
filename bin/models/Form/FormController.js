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
  var due_date = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  return _UnitModel2.default.findOneAndUpdate({ _id: unit_id }, {
    $addToSet: { form_obligations: {
        form: form_id,
        due_date: due_date
      } }
  });
}

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
      uploader: req.user._id
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

router.post('/:id', multerMiddleware('form_uploads').single('file'), function (req, res) {
  _UnitModel2.default.findOne({ _id: req.body.unit }, 'form_obligations').then(function (unit) {
    if (!unit) {
      throw new Error('Unit not found.');
    }

    if (deriveFileExtension(req.file.originalname) != 'pdf') {
      throw new Error('Invalid file extension. Please supply a PDF.');
    }

    for (var key in unit.form_obligations) {
      var obl = form_obligations[key];

      if (obl.form._id.toString() != req.params.id) {
        continue;
      }

      if (obl.approved) {
        throw new Error('Obligation has already been fulfilled and approved.');
      }

      obl.system_filename = req.file.filename;
      obl.extension = deriveFileExtension(req.file.originalname);
      return obl.save();
    }

    throw new Error('Did not find matching form obligation.');
  }).then(function (obl) {
    res.send({
      success: true,
      redirect: '/forms/verify/' + obl._id
    });
  }).catch(function (err) {
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
  var selectedForm = {};
  _FormModel2.default.findOne({ _id: req.params.id }).then(function (form) {
    if (!form) {
      throw new Error('Form not found.');
    }

    selectedForm = form;

    return _UnitModel2.default.find({ 'form_obligations.form': req.params.id }, 'name slug').sort('name').exec();
  }).then(function (units) {
    for (var key in units) {
      var unit = units[key].toObject();

      units[key] = _extends({}, unit, {
        selectedForm: selectedForm
      });
    }

    res.send({
      success: true,
      contents: units
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
  _FormModel2.default.findOne({ _id: req.params.id }).then(function (form) {
    if (!form) {
      throw new Error('Form not found.');
    }

    var category = req.body.category;
    if (category == 'all') {
      form.autoapply_all = true;
      form.autoapply_scholastic = false;
      form.autoapply_independent = false;
    } else if (category == 'scholastic') {
      form.autoapply_all = false;
      form.autoapply_scholastic = true;
      form.autoapply_independent = false;
    } else if (category == 'independent') {
      form.autoapply_all = false;
      form.autoapply_scholastic = false;
      form.autoapply_independent = true;
    } else {
      form.autoapply_all = false;
      form.autoapply_scholastic = false;
      form.autoapply_independent = false;
    }

    return form.save();
  }).then(function (form) {
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

router.get('/verify/:obl', function (req, res) {});

exports.default = router;
module.exports = exports['default'];