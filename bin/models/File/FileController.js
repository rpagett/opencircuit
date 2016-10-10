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

var _FileModel = require('./FileModel');

var _FileModel2 = _interopRequireDefault(_FileModel);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/files/

var multerMiddleware = (0, _multer2.default)({
  dest: './files/uploads/',
  rename: function rename(fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  }
});

router.route('/').get(function (req, res) {
  _FileModel2.default.find({}).exec().then(function (files) {
    res.json({
      success: true,
      contents: files
    });
  });
});

router.post('/', multerMiddleware.any(), function (req, res) {
  console.log('file', req.files);
  console.log('data', req.body);
  res.json({
    success: true
  });
});

exports.default = router;
module.exports = exports['default'];