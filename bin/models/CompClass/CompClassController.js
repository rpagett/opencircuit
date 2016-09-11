'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _CompClassModel = require('./CompClassModel');

var _CompClassModel2 = _interopRequireDefault(_CompClassModel);

var _CompClassValidation = require('./CompClassValidation');

var _CompClassValidation2 = _interopRequireDefault(_CompClassValidation);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/compclasses/

var GUARD_TYPE = '579000db0Oceff06c51ae377';
var WINDS_TYPE = '579000db0fceff06c51ae379';

router.route('/').get(function (req, res) {
  _CompClassModel2.default.find({}, 'name abbreviation unit_type').populate('unit_type', 'name slug detailsUrl').sort('unit_type').exec().then(function (classes) {
    res.json({
      success: true,
      contents: classes
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  (0, _CompClassValidation2.default)(req.body).then(function (data) {
    var compclass = new _CompClassModel2.default(data);

    return compclass.save();
  }).then(function (compclass) {
    res.json({
      success: true,
      redirect: '/compclasses/new'
    });
  }).catch(function (errors) {
    console.log('We\'re in catch.', errors);
    res.json({
      success: false,
      errors: errors
    });
  });
});

router.get('/table', function (req, res) {
  var contents = {};
  _CompClassModel2.default.find({}, '_id name abbreviation unit_type detailsUrl').populate('unit_type', 'name').sort('name').exec().then(function (classes) {
    var ids = [];

    contents = classes;
    classes.map(function (compclass) {
      ids.push(compclass._id);
    });

    return _UnitModel2.default.aggregate([{ $match: { registered: true } }, { $project: { competition_class: 1 } }, {
      $group: {
        _id: '$competition_class',
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

router.route('/:abbreviation').get(function (req, res) {
  _CompClassModel2.default.findOne({ abbreviation: req.params.abbreviation }, 'name abbreviation').then(function (compclass) {
    if (!compclass) {
      throw new Error('That competitive class does not exist.');
    }

    res.json({
      success: true,
      model: compclass
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  (0, _CompClassValidation2.default)(req.body).then(function (data) {
    _CompClassModel2.default.findOneAndUpdate({ abbreviation: data.abbreviation }, data, {
      fields: 'abbreviation detailsUrl'
    }).then(function (compclass) {
      res.send({
        success: true,
        redirect: compclass.detailsUrl
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

router.route('/:id/units').get(function (req, res) {
  _UnitModel2.default.find({ registered: true, competition_class: req.params.id }, '_id name slug organization unit_type competition_class director').populate('organization', 'name detailsUrl').populate('unit_type', 'name').populate('competition_class', 'name abbreviation').populate('director', 'first_name last_name formattedName email profileUrl').sort('name').exec().then(function (units) {
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

router.get('/seed', function (req, res) {
  var compclass = new _CompClassModel2.default({
    abbreviation: 'SA',
    name: 'Scholastic A',
    unit_type: GUARD_TYPE
  });

  compclass.save().then(function () {
    compclass = new _CompClassModel2.default({
      abbreviation: 'WSA',
      name: 'Winds Scholastic A',
      unit_type: WINDS_TYPE
    });
    compclass.save();
  }).then(function () {
    res.json({
      success: true
    });
  }).catch(function () {
    res.json({
      success: false
    });
  });
});

exports.default = router;