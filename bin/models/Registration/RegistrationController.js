'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _OrganizationModel = require('../Organization/OrganizationModel');

var _OrganizationModel2 = _interopRequireDefault(_OrganizationModel);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _OrganizationValidation = require('../Organization/OrganizationValidation');

var _OrganizationValidation2 = _interopRequireDefault(_OrganizationValidation);

var _UnitValidation = require('../Unit/UnitValidation');

var _UnitValidation2 = _interopRequireDefault(_UnitValidation);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/register/...'

router.post('/organization', function (req, res) {
  (0, _OrganizationValidation2.default)(req.body).then(function (data) {
    //Organization.search({ query: data.slug }) This is where I'll do fuzzy matching.

    var org = new _OrganizationModel2.default(data);
    org.slug = data.slug;
    org.director = req.user;

    return org.save();
  }).then(function (org) {
    res.json({
      success: true,
      redirect: '/register/organization/' + org._id
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
});

router.route('/organization/:org').get(function (req, res) {
  _OrganizationModel2.default.findOne({ _id: req.params.org }, 'name director').then(function (org) {
    if (!org) {
      res.json({
        success: false,
        error: 'Organization not found.'
      });
    }

    if (org.director != req.user) {
      res.json({
        success: false,
        error: 'You are not authorized to register a unit for that organization.'
      });
    }

    res.json({
      success: true,
      model: org
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
}).post(function (req, res) {
  (0, _UnitValidation2.default)(req.body).then(function (data) {
    var unit = new _UnitModel2.default(data);

    unit.organization = req.params.org;
    unit.director = req.user;

    return unit.save();
  }).then(function (unit) {
    res.json({
      success: true,
      redirect: '/register/unit/' + unit._id
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
});

router.route('/unit/:unit').get(function (req, res) {
  _UnitModel2.default.findOne({ _id: req.params.unit }, 'name unit_type director').then(function (unit) {
    if (!unit) {
      res.json({
        success: false,
        error: 'Unit not found.'
      });
    }

    if (!unit.director.equals(req.user._id)) {
      res.json({
        success: false,
        error: 'You are not authorized to edit this unit.'
      });
    }

    res.json({
      success: true,
      contents: {
        unit_type: unit.unit_type
      }
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
}).post(function (req, res) {
  console.log('Posting!');
  _UnitModel2.default.findOneAndUpdate({ id: req.params.unit }, {
    members: req.body.members,
    competition_class: req.body.competition_class,
    registered: true
  }).exec().then(function (unit) {
    res.json({
      success: true,
      redirect: '/register/unit/' + req.params.unit + '/events'
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.post('/unit/:unit/events', function (req, res) {
  console.log(req.body);
  res.json({
    success: true,
    redirect: '/register/unit/' + req.params.unit + '/confirm'
  });
});

router.get('/unit/:unit/confirm', function (req, res) {
  _UnitModel2.default.findOne({ _id: req.params.unit }, 'organization').then(function (unit) {
    res.json({
      success: true,
      contents: {
        organization: unit.organization.toString()
      }
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

exports.default = router;