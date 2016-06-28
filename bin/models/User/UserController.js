'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserModel = require('./UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _UserValidation = require('./UserValidation');

var _UserValidation2 = _interopRequireDefault(_UserValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// routes are '/api/users/...'

router.get('/', function (req, res) {
  _UserModel2.default.find({}, 'email first_name mi last_name formattedName profileLink emailLink phone').then(function (users) {
    res.json({
      success: true,
      users: users
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err
    });
  });
});

router.route('/:email').get(function (req, res) {
  _UserModel2.default.findOne({ email: req.params.email }, '-password -hash -salt -createdAt -updatedAt').then(function (user) {
    if (!user) {
      res.json({
        success: false,
        error: 'User not found.'
      });
    } else {
      res.json({
        success: true,
        user: user
      });
    }
  }).catch(function (err) {
    res.json({
      success: false,
      error: err
    });
  });
}).patch(function (req, res) {
  console.log('Body is:', req.body);
  (0, _UserValidation2.default)(req.body).then(function () {
    res.json({
      success: true,
      teehee: true
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
});

exports.default = router;