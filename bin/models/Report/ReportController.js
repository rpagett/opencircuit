'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', function (req, res) {
  _UnitModel2.default.find({ registered: true }, 'name slug createdAt').sort('createdAt').exec().then(function (units) {
    res.json({
      success: true,
      contents: units
    });
  });
});

exports.default = router;
module.exports = exports['default'];