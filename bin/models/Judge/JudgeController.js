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

var _JudgeModel = require('./JudgeModel');

var _JudgeModel2 = _interopRequireDefault(_JudgeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/judges/

router.route('/').get(function (req, res) {
  _JudgeModel2.default.find({}, '_id first_name middle_initial last_name email phone city state').sort('last_name').exec().then(function (judges) {
    res.json({
      success: true,
      contents: judges
    });
  });
});

exports.default = router;
module.exports = exports['default'];