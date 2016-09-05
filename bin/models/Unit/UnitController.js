'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _UnitModel = require('./UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/units/

router.route('/').get(function (req, res) {
  _UnitModel2.default.find({ registered: true }, '_id name slug unit_type competition_class director').populate('unit_type', 'name').populate('competition_class', 'abbreviation').populate('director', 'first_name last_name formattedName email profileUrl').sort('unit_type.name name').exec().then(function (units) {
    res.json({
      success: true,
      contents: units
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

// Mostly just for the registration flow / event modal
router.get('/:id/events', function (req, res) {
  _EventRegistrationModel2.default.find({ unit: req.params.id }, 'event').then(function (registrations) {
    res.json({
      success: true,
      model: {
        events: _lodash2.default.map(registrations, 'events')
      }
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.post('/:id/events', function (req, res) {
  var inEvents = Object.keys(req.body.events);
  console.log('IN EVENTS', inEvents);

  var unit = {};
  var addEvents = [];

  _UnitModel2.default.find({ _id: req.params.id }, 'competition_class').then(function (res_unit) {
    if (!res_unit) {
      throw new Error('Unit not found.');
    }

    unit = res_unit;

    return _EventRegistrationModel2.default.find({ unit: unit._id }, 'event');
  }).then(function (registrations) {
    var registeredEvents = _lodash2.default.map(registrations, 'event');
    console.log('Registered Events', registeredEvents);

    addEvents = _lodash2.default.difference(inEvents, registeredEvents);

    var removeEvents = _lodash2.default.difference(registeredEvents, inEvents);
    console.log('Removing events', removeEvents);

    return _EventRegistrationModel2.default.remove({ unit: unit._id, event: { $in: removeEvents } });
  }).then(function () {
    var creation = [];
    addEvents.each(function (ev) {
      creation.push({
        event: ev,
        unit: unit._id,
        competition_class: unit.competition_class
      });
    });

    console.log('Adding events', addEvents);
    return _EventRegistrationModel2.default.create(creation);
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