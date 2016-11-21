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

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', (0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UnitModel2.default.find({ registered: true }, 'name slug createdAt').sort('createdAt').exec().then(function (units) {
    res.json({
      success: true,
      contents: units
    });
  });
});

router.get('/drawstatus', (0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
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

router.get('/mailchimp', function (req, res) {
  var units = [];

  _UnitModel2.default.find({ registered: true }, 'name slug competition_class director unit_type organization').populate('competition_class', 'name abbreviation').populate('director', 'first_name last_name mi email').populate('unit_type', 'name').populate('organization', 'name street street_2 city state zip').exec().then(function (resUnits) {
    units = resUnits;

    return _EventRegistrationModel2.default.aggregate([{ $lookup: { from: 'events', localField: 'event', foreignField: '_id', as: 'event' } }, { $group: {
        _id: '$unit',
        events: { $push: { name: '$event.name' } }
      }
    }]);
  }).then(function (agg) {
    for (var key in units) {
      var unit = units[key].toObject();
      var line = _lodash2.default.find(agg, { _id: unit._id });

      if (!line) {
        continue;
      }
      units[key] = _extends({}, unit, {
        eventList: _lodash2.default.join(_lodash2.default.map(line.events, 'name'), ', ')
      });
    }

    res.send({
      success: true,
      contents: units
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