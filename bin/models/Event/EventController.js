'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _EventModel = require('./EventModel');

var _EventModel2 = _interopRequireDefault(_EventModel);

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _UnitTypeModel = require('../UnitType/UnitTypeModel');

var _UnitTypeModel2 = _interopRequireDefault(_UnitTypeModel);

var _UserModel = require('../User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _EventValidation = require('./EventValidation');

var _EventValidation2 = _interopRequireDefault(_EventValidation);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/events/...'

router.route('/').get(function (req, res) {
  var events = [];
  _EventModel2.default.find({}, 'name slug detailsUrl date formattedDate attendance_cap').sort('date').exec().then(function (resEvents) {
    events = resEvents;

    return _EventRegistrationModel2.default.find({}).populate('unit', 'confirmed_paid_date').exec();
  }).then(function (registrations) {
    for (var key in events) {
      var event = events[key].toObject();
      var attending = _lodash2.default.filter(registrations, { event: event._id });
      var count = attending.length;

      if (attending.length > event.attendance_cap) {
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

        count = confirmedUnits.length + ' / ' + waitlistUnits.length + ' / ' + unpaidUnits.length;
      }

      events[key] = _extends({}, event, {
        unitCount: count ? count : 0
      });
    }

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
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.EventDirector), function (req, res) {
  (0, _EventValidation2.default)(req.body).then(function (data) {
    var event = new _EventModel2.default(data);
    event.slug = data.slug;

    return event.save();
  }).then(function (event) {
    res.json({
      success: true,
      redirect: event.detailsUrl
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
}).delete((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UnitModel2.default.findOneAndRemove({ slug: req.params.slug }).exec().then(function () {
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

router.get('/edit/:slug', function (req, res) {
  _EventModel2.default.findOne({ slug: req.params.slug }).then(function (event) {
    res.send({
      success: true,
      model: event
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.route('/:slug').get(function (req, res) {
  var event = {};
  _EventModel2.default.findOne({ slug: req.params.slug }).then(function (inEvent) {
    event = inEvent;

    if (!event) {
      throw new Error("That event does not exist.");
    }

    return _EventRegistrationModel2.default.find({ event: event._id }).populate('unit', 'slug name director unit_type confirmed_paid_date')
    //.populate('unit.director', 'first_name middle_initial last_name email')
    .populate('competition_class', 'name abbreviation').exec();
  }).then(function (registrations) {
    return _UnitModel2.default.populate(registrations, [{
      path: 'unit.director',
      model: _UserModel2.default,
      select: 'first_name middle_initial last_name email'
    }, {
      path: 'unit.unit_type',
      model: _UnitTypeModel2.default,
      select: 'name'
    }]);
  }).then(function (registrations) {
    var confirmedUnits = [],
        unpaidUnits = [],
        waitlistUnits = [];

    if (registrations.length) {
      unpaidUnits = _lodash2.default.filter(registrations, function (reg) {
        return reg.unit.confirmed_paid_date == null;
      });

      confirmedUnits = _lodash2.default.filter(registrations, function (reg) {
        return reg.unit.confirmed_paid_date != null;
      });

      if (registrations.length >= event.attendance_cap) {
        var unitList = _lodash2.default.sortBy(confirmedUnits, function (reg) {
          if (reg.createdAt > reg.unit.confirmed_paid_date) {
            return reg.createdAt;
          }

          return reg.unit.confirmed_paid_date;
        });

        //console.log('SORTED', _.map(unitList, reg => reg.unit.name));

        confirmedUnits = _lodash2.default.slice(unitList, 0, event.attendance_cap);
        waitlistUnits = _lodash2.default.slice(unitList, event.attendance_cap);
      }

      confirmedUnits = _lodash2.default.sortBy(confirmedUnits, ['unit.unit_type', 'competition_class.abbreviation']);
    }

    res.json({
      success: true,
      model: _extends({}, event.toObject(), {
        confirmedUnits: confirmedUnits,
        waitlistUnits: waitlistUnits,
        unpaidUnits: unpaidUnits
      })
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.hasRole)(_UserRoles.UserRoles.EventDirector), function (req, res) {
  (0, _EventValidation2.default)(req.body).then(function (data) {
    var fillableData = _lodash2.default.pick(data, _EventModel2.default.fillableFields());
    _EventModel2.default.findOneAndUpdate({ slug: data.slug }, fillableData, {
      fields: 'slug detailsUrl'
    }).then(function (data) {
      res.send({
        success: true,
        redirect: data.detailsUrl
      });
    }).catch(function (err) {
      console.log('ERRORS', err);
    });
  }).catch(function (errors) {
    console.log('OTHER ERRORS', errors);
    res.json({
      success: false,
      errors: errors
    });
  });
}).delete((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _EventModel2.default.findOneAndRemove({ slug: req.params.slug }).exec().then(function () {
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

// :type is a UnitType _id
router.get('/by_type/:type', function (req, res) {
  _EventModel2.default.find({}, '_id name date registration_closed date')
  //Event.find({ types_allowed: req.params.type }, '_id name')
  .sort('date').exec().then(function (events) {
    res.json({
      success: true,
      events: events
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.route('/:slug/times').get(function (req, res) {
  var event = {};

  _EventModel2.default.findOne({ slug: req.params.slug }, 'name').then(function (resEvent) {
    event = resEvent;

    return _EventRegistrationModel2.default.find({ event: event._id }).populate('unit', 'name unit_type').populate('competition_class', 'name abbreviation');
  }).then(function (regs) {
    var contents = {};
    for (var key in regs) {
      var reg = regs[key];
      contents['performance_time.' + reg.unit._id] = reg.performance_time;
    }

    console.log(contents);
    res.send({
      success: true,
      model: contents
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
}).patch(function (req, res) {
  var event = {};
  _EventModel2.default.findOne({ slug: req.params.slug }, '_id date').then(function (resEvent) {
    event = resEvent;

    return _EventRegistrationModel2.default.find({ event: event._id });
  }).then(function (regs) {
    console.log(req.body);
    var calls = [];
    regs.map(function (reg) {
      var time = req.body['performance_time.' + reg.unit];
      if (time) {
        calls.push(new Promise(function (res, rej) {
          console.log('Saving performance time for ', reg.unit, ': ', time);
          reg.performance_time = time;
          reg.save();
          res();
        }));
      }
    });

    return Promise.all(calls);
  }).then(function () {
    res.json({
      success: true,
      redirect: '/events/' + req.params.slug
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.get('/:slug/lineup', function (req, res) {
  _EventModel2.default.findOne({ slug: req.params.slug }, '_id').then(function (event) {
    return _EventRegistrationModel2.default.find({ event: event._id }).populate({
      path: 'unit',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'director competition_class unit_type' }
    })
    // .populate('unit', 'name director spiel competition_class unit_type')
    // .populate('unit.director', 'first_name mi last_name')
    // .populate('unit.competition_class', 'name abbreviation')
    // .populate('unit.unit_type', 'name')
    .sort('performance_time').exec();
  }).then(function (regs) {
    res.send({
      success: true,
      contents: regs
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.get('/:slug/spiels', function (req, res) {
  _EventModel2.default.findOne({ slug: req.params.slug }).then(function (event) {
    return _EventRegistrationModel2.default.find({ event: event._id }).sort('performance_time');
  }).then(function (regs) {
    var ids = _lodash2.default.map(regs, 'unit');
    return _UnitModel2.default.find({ _id: { $in: ids }, spiel: { $exists: true, $ne: null } }, 'name spiel organization').populate('organization', 'city state');
  }).then(function (units) {
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

router.get('/:slug/critique', function (req, res) {
  _EventModel2.default.findOne({ slug: req.params.slug }, '_id').then(function (event) {
    return _EventRegistrationModel2.default.find({ event: event._id, attending_critique: true }).populate({
      path: 'unit',
      populate: { path: 'director competition_class unit_type' }
    }).sort('performance_time').exec();
  }).then(function (regs) {
    res.send({
      success: true,
      contents: regs
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.get('/:slug/registration', function (req, res) {
  _EventModel2.default.findOne({ slug: req.params.slug }, '_id').then(function (event) {
    if (!event) {
      throw new Error('Event not found.');
    }

    return _EventRegistrationModel2.default.find({ event: event._id }).populate({
      path: 'unit',
      populate: {
        path: 'director form_obligations',
        populate: {
          path: 'form',
          model: 'Form',
          select: 'name'
        }
      }
    }).sort('performance_time').exec();
  }).then(function (regs) {
    for (var key in regs) {
      var missing = _lodash2.default.filter(regs[key].unit.form_obligations, function (o) {
        return o.submitted != true;
      });
      missing = _lodash2.default.map(missing, function (o) {
        return o.form.name;
      });
      missing = _lodash2.default.join(missing, ', ');

      regs[key] = _extends({}, regs[key].toObject(), {
        missing: missing
      });
    }

    res.send({
      success: true,
      contents: regs
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
    console.error(err);
  });
});

exports.default = router;
module.exports = exports['default'];