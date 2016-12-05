'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _authRoute = require('../../middleware/authRoute');

var _UserRoles = require('../User/UserRoles');

var _CompClassModel = require('../CompClass/CompClassModel');

var _CompClassModel2 = _interopRequireDefault(_CompClassModel);

var _EventModel = require('../Event/EventModel');

var _EventModel2 = _interopRequireDefault(_EventModel);

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

var _FeeModel = require('../Fee/FeeModel');

var _FeeModel2 = _interopRequireDefault(_FeeModel);

var _UnitModel = require('./UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/units/

_UnitModel2.default.on('afterRemove', function (unit) {
  _EventRegistrationModel2.default.remove({ unit: unit._id }).exec();
});

function updateEvents(id, events) {
  var inEvents = [];

  for (var key in events) {
    if (events[key]) {
      inEvents.push(key);
    }
  }

  //const inEvents = Object.keys(events);

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

    addEvents = _lodash2.default.differenceBy(inEvents, registeredEvents, String);

    var removeEvents = _lodash2.default.differenceBy(registeredEvents, inEvents, String);

    _EventRegistrationModel2.default.remove({ unit: unit._id, event: { $in: removeEvents } }).exec();

    var creation = [];
    addEvents.forEach(function (ev) {
      creation.push({
        event: ev,
        unit: unit._id,
        competition_class: unit.competition_class
      });
    });

    return _EventRegistrationModel2.default.create(creation);
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
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
}).delete((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UnitModel2.default.findOneAndRemove({ slug: req.params.slug }).exec().then(function (unit) {
    _EventRegistrationModel2.default.remove({ unit: unit._id }).exec();
    return _FeeModel2.default.remove({ unit: unit._id }).exec();
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

router.get('/forUser/:id', function (req, res) {
  _UnitModel2.default.find({ director: req.params.id }, '_id name slug organization unit_type competition_class director last_music_submission').populate('organization', 'name detailsUrl').populate('unit_type', 'name').populate('competition_class', 'name abbreviation').populate('director', 'first_name last_name formattedName email profileUrl').sort('unit_type.name name').then(function (units) {
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

    return _EventModel2.default.find({/*types_allowed: type*/}, '_id name slug date registration_closed').sort('date').exec();
  }).then(function (events) {
    var outEvents = [];

    for (var key in events) {

      var event = events[key].toObject();
      var isAttending = _lodash2.default.find(storeRegistrations, ['event', event._id]) ? true : false;

      outEvents[key] = _extends({}, event, {
        attending: isAttending
      });
    }

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
  var contents = [];
  var unit = {};
  var inEvents = [];
  var allRegistrations = [];

  _UnitModel2.default.findOne({ slug: req.params.slug }, '_id confirmed_paid_date').then(function (inUnit) {
    unit = inUnit;
    //console.log('unit is', unit);

    return _EventRegistrationModel2.default.find({ unit: { $ne: null } }).populate('unit', '_id confirmed_paid_date director').populate('competition_class', 'name abbreviation').exec();
  }).then(function (registrations) {
    allRegistrations = _lodash2.default.groupBy(registrations, 'event');

    return _EventModel2.default.find({ _id: { $in: Object.keys(allRegistrations) } }).sort('date');
  }).then(function (events) {
    for (var key in events) {
      var event = events[key];

      var status = 'Confirmed';
      //console.log('all registrations', allRegistrations);
      //console.log('this event', allRegistrations[event._id])
      var unitList = allRegistrations[event._id];
      //let unitList = _.map(allRegistrations[event._id], reg => reg.unit);
      //console.log('unitList', unitList);
      var unitKey = _lodash2.default.findKey(unitList, function (reg) {
        return reg.unit.id == unit.id;
      });
      //console.log('key', unitKey);

      if (!unitKey && unitKey !== 0) {
        console.log('cnting');continue;
      }
      var found = unitList[unitKey];

      //console.log('obj at unitkey', unitKey, unitList[unitKey]);

      if (unit.confirmed_paid_date) {
        if (unitList.length >= event.attendance_cap) {
          var paidUnits = _lodash2.default.filter(unitList, function (reg) {
            return reg.unit.confirmed_paid_date != null;
          });

          paidUnits = _lodash2.default.sortBy(paidUnits, function (reg) {
            if (reg.createdAt > reg.unit.confirmed_paid_date) {
              return reg.createdAt;
            }

            return reg.unit.confirmed_paid_date;
          });

          //console.log('Paid Units', _.map(paidUnits, reg => reg.unit.name));

          unitKey = _lodash2.default.findKey(paidUnits, function (reg) {
            return reg.unit.id == unit.id;
          });
          found = paidUnits[unitKey];
          console.log('Key for event', event.name, 'is', unitKey, '. Cap is', event.attendance_cap);

          if (parseInt(unitKey) + 1 > event.attendance_cap) {
            status = 'On Waitlist';
          }
        }
      } else {
        status = 'Owes Fees';
      }

      //const found = _.find(allRegistrations[event._id], reg => { return reg.unit.id == unit.id });
      //console.log('found', found);

      contents.push(_extends({}, event.toObject(), {
        status: status,
        competition_class: found.competition_class.formattedName
      }));
    }

    res.json({
      success: true,
      contents: contents
    });
  })
  //.then(registrations => {
  //console.log('registrations/show', registrations);
  //  const events = _.map(registrations, 'event');
  //  //console.log('events/show', events);
  //  return Event.find({ _id: {$in: events} }, 'name slug date attendance_cap')
  //})
  //.then(events => {
  //  console.log('fetched events/show', events);
  //  res.json({
  //    success: true,
  //    contents: events
  //  })
  //})
  .catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.route('/:slug/music').patch(function (req, res) {
  _UnitModel2.default.findOneAndUpdate({ slug: req.params.slug }, { last_music_submission: Date.now() }).then(function (unit) {
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

router.patch('/:id/reclassify', (0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UnitModel2.default.findOne({ _id: req.params.id }, 'competition_class').then(function (unit) {
    if (!unit) {
      throw new Error('Unit does not exist.');
    }
    unit.competition_class = req.body.compclass;
    return unit.save();
  }).then(function (unit) {
    return _EventModel2.default.find({ date: { $gt: Date.now() } }, '_id');
  }).then(function (events) {
    return _EventRegistrationModel2.default.update({
      event: { $in: _lodash2.default.map(events, '_id') },
      unit: req.params.id
    }, { competition_class: req.body.compclass }, { multi: true });
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