'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FeeCategoryModel = require('../FeeCategory/FeeCategoryModel');

var _FeeCategoryModel2 = _interopRequireDefault(_FeeCategoryModel);

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/feecategories/

router.route('/').get(function (req, res) {
  _FeeCategoryModel2.default.find({}, 'name slug').then(function (categories) {
    res.json({
      success: true,
      contents: categories
    });
  });
});

router.get('/select', function (req, res) {
  _FeeCategoryModel2.default.find({}, 'name slug').then(function (categories) {
    var json = [];
    categories.map(function (unit) {
      json.push({
        value: unit.slug,
        label: unit.name
      });
    });

    res.json(json);
  });
});

exports.default = router;