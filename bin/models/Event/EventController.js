'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
  var contents = [];
  _EventModel2.default.find({}, 'name slug detailsUrl date formattedDate attendance_cap').sort('date').exec().then(function (events) {
    contents = events;

    var ids = [];
    events.map(function (event) {
      ids.push(event._id);
    });

    return _EventRegistrationModel2.default.aggregate([{ $match: { event: { $in: ids } } }, { $project: { event: 1 } }, {
      $group: {
        _id: '$event',
        count: { $sum: 1 }
      }
    }]);
  }).then(function (counts) {
    for (var key in contents) {
      contents[key] = contents[key].toObject();
      var count = _lodash2.default.find(counts, { _id: contents[key]._id });

      contents[key] = _extends({}, contents[key], {
        unitCount: count ? count.count : 0
      });
    }

    res.json({
      success: true,
      contents: contents
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.EventDirector), function (req, res) {
  console.log('Body is', req.body);
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
    console.log('We\'re in catch.', errors);
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
      console.log('Unpaid units', unpaidUnits);

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

exports.default = router;
module.exports = exports['default'];