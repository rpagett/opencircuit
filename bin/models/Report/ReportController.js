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

var _EventModel = require('../Event/EventModel');

var _EventModel2 = _interopRequireDefault(_EventModel);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', (0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UnitModel2.default.find({ registered: true }, 'name slug createdAt confirmed_paid_date').sort('createdAt').exec().then(function (units) {
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
  var registrations = [];

  _UnitModel2.default.find({ registered: true }, 'name slug competition_class director unit_type organization').populate('competition_class', 'name abbreviation').populate('director', 'first_name last_name mi email phone').populate('unit_type', 'name').populate('organization', 'name street street_2 city state zip').exec().then(function (resUnits) {
    units = resUnits;

    return _EventRegistrationModel2.default.find({}).populate('unit', 'confirmed_paid_date').populate('event', 'date').exec();
  }).then(function (resRegistrations) {
    registrations = resRegistrations;

    return _EventModel2.default.find({}, 'name attendance_cap date');
  }).then(function (resEvents) {
    var events = resEvents;
    for (var key in events) {
      var event = events[key].toObject();
      var attending = _lodash2.default.filter(registrations, ['event._id', event._id]);
      console.log('attending', attending.length);

      var allUnits = _lodash2.default.sortBy(attending, function (reg) {
        if (reg.createdAt > reg.unit.confirmed_paid_date) {
          return reg.createdAt;
        }

        return reg.unit.confirmed_paid_date;
      });

      var paidUnits = _lodash2.default.filter(allUnits, function (reg) {
        return reg.unit.confirmed_paid_date != null;
      });
      var unpaidUnits = _lodash2.default.reject(allUnits, function (reg) {
        return reg.unit.confirmed_paid_date != null;
      });
      var confirmedUnits = _lodash2.default.slice(paidUnits, 0, event.attendance_cap);
      var waitlistUnits = _lodash2.default.slice(paidUnits, event.attendance_cap);

      events[key] = _extends({}, event, {
        confirmedUnits: confirmedUnits,
        waitlistUnits: waitlistUnits,
        unpaidUnits: unpaidUnits
      });
      console.log('Added event', event.name, confirmedUnits.length, '/', waitlistUnits.length, '/', unpaidUnits.length);
    }

    var _loop = function _loop(_key) {
      var unit = units[_key].toObject();
      var attending = _lodash2.default.filter(registrations, ['unit._id', unit._id]);
      if (!attending) {
        return 'continue';
      }

      attending = _lodash2.default.sortBy(attending, function (reg) {
        return reg.event.date;
      });

      var eventList = [];
      attending.map(function (reg) {
        var status = 'Confirmed';

        var thisEvent = _lodash2.default.find(events, { _id: reg.event._id });
        if (_lodash2.default.find(thisEvent.waitlistUnits, ['unit._id', unit._id])) {
          status = 'Waitlist';
        } else if (_lodash2.default.find(thisEvent.unpaidUnits, ['unit._id', unit._id])) {
          status = 'Unpaid';
        }

        eventList.push(thisEvent.name + ' [' + status + ']');
      });

      //console.log('Event list is', eventList);
      units[_key] = _extends({}, unit, {
        eventList: _lodash2.default.join(eventList, ', ')
      });
    };

    for (var _key in units) {
      var _ret = _loop(_key);

      if (_ret === 'continue') continue;
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