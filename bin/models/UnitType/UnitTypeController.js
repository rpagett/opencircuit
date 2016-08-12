'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UnitTypeModel = require('./UnitTypeModel');

var _UnitTypeModel2 = _interopRequireDefault(_UnitTypeModel);

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