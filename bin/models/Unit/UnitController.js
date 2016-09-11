'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _UnitModel = require('./UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _EventModel = require('../Event/EventModel');

var _EventModel2 = _interopRequireDefault(_EventModel);

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/units/

function updateEvents(id, events) {
  var inEvents = [];

  for (var key in events) {
    if (events[key]) {
      inEvents.push(key);
    }
  }

  //const inEvents = Object.keys(events);
  console.log('IN EVENTS', inEvents);

  var unit = {};
  var addEvents = [];

  return _UnitModel2.default.findOne({ _id: id }, 'competition_class').then(function (res_unit) {
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

    _EventRegistrationModel2.default.remove({ unit: unit._id, event: { $in: removeEvents } }).exec();

    var creation = [];
    addEvents.forEach(function (ev) {
      creation.push({
        event: ev,
        unit: unit._id,
        competition_class: unit.competition_class
      });
    });

    console.log('Adding events', addEvents);
    return _EventRegistrationModel2.default.create(creation);
  });
}

router.route('/').get(function (req, res) {
  _UnitModel2.default.find({ registered: true }, '_id name slug organization unit_type competition_class director').populate('organization', 'name detailsUrl').populate('unit_type', 'name').populate('competition_class', 'name abbreviation').populate('director', 'first_name last_name formattedName email profileUrl').sort('unit_type.name name').exec().then(function (units) {
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

router.get('/select', function (req, res) {
  _UnitModel2.default.find({ registered: true }, '_id name').then(function (units) {
    var json = [];
    units.map(function (unit) {
      json.push({
        value: unit._id.toString(),
        label: unit.name
      });
    });

    res.json(json);
  });
});

router.route('/:slug').get(function (req, res) {
  _UnitModel2.default.findOne({ slug: req.params.slug }).populate('organization', 'name slug detailsUrl is_school').populate('unit_type', 'name').populate('competition_class', 'name abbreviation formattedName').populate('director', 'first_name last_name formattedName email profileUrl').exec().then(function (unit) {
    res.json({
      success: true,
      model: unit
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch(function (req, res) {
  _UnitModel2.default.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    upsert: true,
    fields: '_id slug detailsUrl'
  }).then(function (unit) {
    console.log('ID is', unit._id, 'EVENTS are', req.body.events);
    return updateEvents(unit._id, req.body.events);
  }).then(function () {
    res.send({
      success: true,
      redirect: '/units/' + req.params.slug
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

// Mostly just for the registration flow / event modal
router.route('/:id/events').get(function (req, res) {
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
}).post(function (req, res) {
  updateEvents(req.params.id, req.body.events).then(function () {
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

router.get('/:slug/eventChecks', function (req, res) {
  var type = '';
  var storeRegistrations = [];
  _UnitModel2.default.findOne({ slug: req.params.slug }, '_id type').then(function (unit) {
    type = unit.unit_type;
    return _EventRegistrationModel2.default.find({ unit: unit._id }, 'event');
  }).then(function (registrations) {
    storeRegistrations = registrations;

    return _EventModel2.default.find({ types_allowed: type }, '_id name slug date');
  }).then(function (events) {
    var outEvents = [];

    console.log('registrations', storeRegistrations);
    for (var key in events) {

      var event = events[key].toObject();
      var isAttending = _lodash2.default.find(storeRegistrations, ['event', event._id]) ? true : false;

      outEvents[key] = _extends({}, event, {
        attending: isAttending
      });
    }

    console.log('EVENTS', outEvents);

    res.json({
      success: true,
      events: outEvents
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.get('/:slug/attending', function (req, res) {
  _UnitModel2.default.findOne({ slug: req.params.slug }, '_id').then(function (unit) {
    console.log('unit is', unit);
    return _EventRegistrationModel2.default.find({ unit: unit._id }, 'unit event');
  }).then(function (registrations) {
    console.log('registrations/show', registrations);
    var events = _lodash2.default.map(registrations, 'event');
    console.log('events/show', events);
    return _EventModel2.default.find({ _id: { $in: events } }, 'name slug date attendance_cap');
  }).then(function (events) {
    console.log('fetched events/show', events);
    res.json({
      success: true,
      contents: events
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

exports.default = router;