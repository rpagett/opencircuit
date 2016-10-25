'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

router.get('/drawstatus', function (req, res) {
  _UnitModel2.default.find({ registered: true }, 'name confirmed_paid_date director').populate('director', 'first_name mi last_name').exec().then(function (units) {
    for (var key in units) {
      var unit = units[key].toObject();

      if (unit.confirmed_paid_date) {
        units[key] = _extends({}, unit, {
          paymentStatus: 'Received',
          paymentClass: 'cell-green'
        });
      } else {
        units[key] = _extends({}, unit, {
          paymentStatus: 'Awaiting',
          paymentClass: 'cell-red'
        });
      }
    }

    units.sort(function (a, b) {
      if (a.paymentStatus == b.paymentStatus) {
        return a.name.localeCompare(b.name);
      }

      return a.paymentStatus.localeCompare(b.paymentStatus);
    });

    res.json({
      success: true,
      contents: units
    });
  });
});

exports.default = router;
module.exports = exports['default'];