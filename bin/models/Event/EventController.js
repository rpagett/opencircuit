'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _EventModel = require('./EventModel');

var _EventModel2 = _interopRequireDefault(_EventModel);

var _EventValidation = require('./EventValidation');

var _EventValidation2 = _interopRequireDefault(_EventValidation);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/events/...'

router.route('/').get(function (req, res) {
  _EventModel2.default.find({}, 'name slug detailsUrl date formattedDate attendance_cap').sort('date').exec().then(function (events) {
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
});

router.route('/:slug').get(function (req, res) {
  _EventModel2.default.findOne({ slug: req.params.slug }).then(function (event) {
    if (!event) {
      throw new Error("That event does not exist.");
    }

    res.json({
      success: true,
      model: event
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
});

// :type is a UnitType _id
router.get('/by_type/:type', function (req, res) {
  _EventModel2.default.find({}, '_id name date')
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