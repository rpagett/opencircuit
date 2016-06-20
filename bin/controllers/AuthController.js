'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _AuthActions = require('../actions/AuthActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', function (req, res) {
  _UserModel2.default.authenticate()(req.body.email, req.body.password, function (err, user, options) {
    if (err) return next(err);
    if (user === false) {
      res.send({
        message: options.message,
        success: false
      });
    } else {
      req.login(user, function (err) {
        res.send({
          success: true,
          user: user
        });

        console.log('\n----\n');
        console.log(req.session);
      });
    }
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/auth/login');
});

exports.default = router;