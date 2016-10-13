'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _OrganizationModel = require('./OrganizationModel');

var _OrganizationModel2 = _interopRequireDefault(_OrganizationModel);

var _OrganizationValidation = require('./OrganizationValidation');

var _OrganizationValidation2 = _interopRequireDefault(_OrganizationValidation);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/organizations/...'

_OrganizationModel2.default.on('afterRemove', function (org) {
  _UnitModel2.default.findAndRemove({ organization: org._id }).exec();
});

router.route('/').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  var contents = [];
  var ids = [];

  _OrganizationModel2.default.find({}).populate('director', 'first_name last_name middle_initial email').exec().then(function (orgs) {
    contents = orgs;

    orgs.map(function (org) {
      ids.push(org._id);
    });

    return _UnitModel2.default.aggregate([{ $match: { registered: true } }, { $project: { organization: 1 } }, {
      $group: {
        _id: '$organization',
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
});

router.route('/:slug').get(function (req, res) {
  _OrganizationModel2.default.findOne({ slug: req.params.slug }).populate('director', 'first_name last_name middle_initial email').exec().then(function (org) {
    res.json({
      success: true,
      model: org
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch(function (req, res) {
  (0, _OrganizationValidation2.default)(req.body).then(function (data) {
    _OrganizationModel2.default.findOneAndUpdate({ slug: req.params.slug }, data, {
      upsert: true,
      fields: 'slug detailsUrl'
    }).then(function (unit) {
      res.send({
        success: true,
        redirect: '/organizations/' + req.params.slug
      });
    }).catch(function (err) {
      res.send({
        success: false,
        error: err.message
      });
    });
  });
}).delete((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _OrganizationModel2.default.findOneAndRemove({ slug: req.params.slug }).exec().then(function () {
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

router.route('/:slug/units').get(function (req, res) {
  _OrganizationModel2.default.findOne({ slug: req.params.slug }, '_id').then(function (org) {
    return _UnitModel2.default.find({ organization: org._id }).populate('organization', 'name').populate('unit_type', 'name').populate('competition_class', 'name abbreviation').populate('director', 'first_name middle_initial last_name email').exec();
  }).then(function (units) {
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

exports.default = router;
module.exports = exports['default'];