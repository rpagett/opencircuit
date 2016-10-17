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

var _JudgeValidation = require('./JudgeValidation');

var _JudgeValidation2 = _interopRequireDefault(_JudgeValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/judges/

router.route('/').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.JudgeManager), function (req, res) {
  _JudgeModel2.default.find({}, '_id first_name middle_initial last_name email phone city state').sort('last_name').exec().then(function (judges) {
    res.json({
      success: true,
      contents: judges
    });
  });
}).post((0, _authRoute.hasRole)(_UserRoles.UserRoles.JudgeManager), function (req, res) {
  console.log('Body is', req.body);
  (0, _JudgeValidation2.default)(req.body).then(function (data) {
    var judge = new _JudgeModel2.default(data);

    return judge.save();
  }).then(function (judge) {
    res.json({
      success: true,
      redirect: judge.profileUrl
    });
  }).catch(function (errors) {
    console.log('We\'re in catch.', errors);
    res.json({
      success: false,
      errors: errors
    });
  });
});

router.route('/:email').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.JudgeManager), function (req, res) {
  _JudgeModel2.default.findOne({ email: req.params.email }).then(function (judge) {
    if (!judge) {
      throw new Error('Judge not found.');
    }
    res.json({
      success: true,
      model: judge
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.hasRole)(_UserRoles.UserRoles.JudgeManager), function (req, res) {
  (0, _JudgeValidation2.default)(req.body).then(function (data) {
    return _JudgeModel2.default.findOneAndUpdate({ email: req.params.email }, data, {
      fields: 'email profileUrl'
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  }).then(function (judge) {
    res.send({
      success: true,
      redirect: judge.profileUrl
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