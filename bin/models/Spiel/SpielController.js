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
// All routes are '/api/spiels/...'

router.route('/').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.EventDirector), function (req, res) {
  _UnitModel2.default.find({ registered: true }, 'name slug director spiel').sort('name').populate('director', 'first_name mi last_name email')
  // .populate('spiel')
  .exec().then(function (units) {
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

router.get('/user/:id', function (req, res) {
  _UnitModel2.default.find({ director: req.params.id }, 'name slug spiel').then(function (units) {
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

router.route('/:slug').get(function (req, res) {
  _UnitModel2.default.findOne({ slug: req.params.slug }, 'name slug spiel organization')
  // .populate('spiel')
  .populate('organization', 'city state').exec().then(function (unit) {
    if (!unit) {
      throw new Error('Unit not found.');
    }

    var spiel = unit.spiel ? unit.spiel : {};
    var unit_name = spiel.unit_name,
        show_title = spiel.show_title,
        directors = spiel.directors,
        age_outs = spiel.age_outs;


    res.send({
      success: true,
      model: {
        unit_name: unit_name,
        show_title: show_title,
        directors: directors,
        age_outs: age_outs,
        name: unit.name,
        city: unit.organization.city,
        state: unit.organization.state
      }
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
}).patch(function (req, res) {
  _UnitModel2.default.findOne({ slug: req.params.slug }, 'spiel').then(function (unit) {
    if (!unit) {
      throw new Error('Unit not found.');
    }

    unit.spiel = unit.spiel ? unit.spiel : {};

    unit.spiel.unit_name = req.body.unit_name;
    unit.spiel.show_title = req.body.show_title;
    unit.spiel.directors = req.body.directors;
    unit.spiel.age_outs = req.body.age_outs;

    return unit.save();
  }).then(function (unit) {
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

exports.default = router;
module.exports = exports['default'];