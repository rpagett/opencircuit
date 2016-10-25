'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _FormModel = require('./FormModel');

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

var router = _express2.default.Router();

router.route('/').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), function (req, res) {
  var forms = [];
  _FormModel.Form.find({}, 'name').then(function (formRes) {
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

    res.json({
      success: true,
      contents: forms
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.FormsManager), multerMiddleware('form_templates').single('file'), function (req, res) {
  (0, _FormValidation2.default)(req.body).then(function (data) {
    var filename = data.name;
    if (!filename || filename == 'undefined' || typeof filename == 'undefined') {
      filename = req.file.originalname;
    }

    var form = new _FormModel.Form({
      name: filename,
      description: data.description,
      form_filename: req.file.filename,
      form_extension: deriveFileExtension(req.file.originalname),
      uploader: req.user._id
    });

    return _FormModel.Form.save();
  }).then(function (form) {
    res.json({
      success: true
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

exports.default = router;
module.exports = exports['default'];