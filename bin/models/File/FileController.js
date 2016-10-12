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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _FileModel = require('./FileModel');

var _FileModel2 = _interopRequireDefault(_FileModel);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/files/

function deriveFileExtension(fname) {
  return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
}

var multerMiddleware = (0, _multer2.default)({
  dest: 'files/uploads/'
});

router.route('/').get(function (req, res) {
  _FileModel2.default.find({}).populate('uploader', 'first_name mi last_name').exec().then(function (files) {
    res.json({
      success: true,
      contents: files
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), multerMiddleware.single('file'), function (req, res) {
  //console.log('file', req.file);
  //console.log('data', req.body);

  var filename = req.body.filename;
  if (!filename || filename == 'undefined' || typeof filename == 'undefined') {
    filename = req.file.originalname;
  }

  var file = new _FileModel2.default({
    user_filename: req.body.filename || req.file.originalname,
    system_filename: req.file.filename,
    uploader: req.user._id,
    extension: deriveFileExtension(req.file.originalname)
  });

  file.save().then(function () {
    res.json({
      success: true
    });
  }).catch(function (err) {
    console.log('SAVE ERR', err.message);
  });
});

router.route('/:filename').get(function (req, res) {
  _FileModel2.default.findOne({ system_filename: req.params.filename }).exec().then(function (file) {
    if (!file) {
      res.sendStatus(404);
    }

    res.set('Content-disposition', 'attachment; filename=' + file.user_filename + '.' + file.extension);
    res.sendFile(_path2.default.resolve(process.cwd(), 'files', 'uploads', file.system_filename));
  }).catch(function (err) {
    console.log(err.message);
    res.sendStatus(404);
  });
}).delete((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _FileModel2.default.findOneAndRemove({ system_filename: req.params.filename }).exec().then(function (file) {
    if (!file) {
      throw new Error('File not found.');
    }

    return _fs2.default.unlink('files/uploads/' + req.params.filename);
  }).then(function () {
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