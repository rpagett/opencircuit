'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _CompClassModel = require('../CompClass/CompClassModel');

var _CompClassModel2 = _interopRequireDefault(_CompClassModel);

var _UnitTypeModel = require('./UnitTypeModel');

var _UnitTypeModel2 = _interopRequireDefault(_UnitTypeModel);

var _UnitTypeValidation = require('./UnitTypeValidation');

var _UnitTypeValidation2 = _interopRequireDefault(_UnitTypeValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/unittypes/

router.route('/').get(function (req, res) {
  _UnitTypeModel2.default.find({}, '_id name').sort('name').exec().then(function (types) {
    res.json({
      success: true,
      contents: types
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  (0, _UnitTypeValidation2.default)(req.body).then(function (data) {
    var type = new _UnitTypeModel2.default(data);

    return type.save();
  }).then(function (type) {
    res.json({
      success: true,
      redirect: '/unittypes/new'
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
  _UnitTypeModel2.default.find({}, '_id name slug detailsUrl').sort('name').exec().then(function (types) {
    var ids = [];

    contents = types;
    types.map(function (type) {
      ids.push(type._id);
    });

    return _UnitModel2.default.aggregate([{ $match: { registered: true } }, { $project: { unit_type: 1 } },
    //{ $unwind: '$tokens' } /* this converts arrays into unique documents for counting */
    {
      $group: {
        _id: '$unit_type',
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

router.get('/select', function (req, res) {
  console.log('KNOCK KNOCK');
  _UnitTypeModel2.default.find({}, '_id name').sort('name').exec().then(function (types) {
    var json = [];
    types.map(function (type) {
      json.push({
        value: type._id.toString(),
        label: type.name
      });
    });

    res.json(json);
  });
});

router.route('/:slug').get(function (req, res) {
  _UnitTypeModel2.default.findOne({ slug: req.params.slug }).then(function (type) {
    if (!type) {
      throw new Error("That unit type does not exist.");
    }

    res.json({
      success: true,
      contents: type
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  (0, _UnitTypeValidation2.default)(req.body).then(function (data) {
    _UnitTypeModel2.default.findOneAndUpdate({ slug: req.params.slug }, { name: data.name }, {
      fields: 'slug detailsUrl'
    }).then(function (type) {
      res.send({
        success: true,
        redirect: type.detailsUrl
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

router.route('/:slug/units').get(function (req, res) {
  _UnitTypeModel2.default.findOne({ slug: req.params.slug }, '_id').then(function (type) {
    if (!type) {
      throw new Error('Unit type does not exist.');
    }

    return _UnitModel2.default.find({ unit_type: type }, '_id name slug competition_class unit_type director').populate('unit_type', 'name').populate('competition_class', 'abbreviation').populate('director', 'first_name last_name formattedName email profileUrl').sort('name').exec();
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

router.get('/:type/classes(/:scholastic)?', function (req, res) {
  console.log('KNOCK KNOCK');
  var query = _CompClassModel2.default.find({ unit_type: req.params.type }, '_id name abbreviation').sort('name');

  if (req.params.scholastic === 'scholastic') {
    query.where('scholastic').equals(true);
  } else {
    query.where('scholastic').equals(false);
  }

  query.exec().then(function (classes) {
    var json = [];
    classes.map(function (compclass) {
      json.push({
        value: compclass._id.toString(),
        label: compclass.name + ' (' + compclass.abbreviation.toUpperCase() + ')'
      });
    });

    res.json(json);
  });
});

router.get('/seed', function (req, res) {
  var type = new _UnitTypeModel2.default({
    slug: 'guard',
    name: 'Guard'
  });

  type.save().then(function () {
    type = new _UnitTypeModel2.default({
      slug: 'percussion',
      name: 'Percussion'
    });

    return type.save();
  }).then(function () {
    type = new _UnitTypeModel2.default({
      slug: 'winds',
      name: 'Winds'
    });

    return type.save();
  }).then(function () {
    res.json({
      success: true
    });
  }).catch(function (err) {
    res.json({
      error: err.message
    });
  });
});

exports.default = router;
module.exports = exports['default'];