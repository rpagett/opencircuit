'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

var _UserModel = require('../User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _AuthActions = require('./AuthActions');

var _UserValidation = require('../User/UserValidation');

var _UserValidation2 = _interopRequireDefault(_UserValidation);

var _functions = require('../../helpers/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/auth/...'

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

router.post('/register', function (req, res) {
  (0, _UserValidation2.default)(req.body).then(function () {
    _UserModel2.default.register(new _UserModel2.default({ email: req.body.email }), req.body.password, function (err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else {
        console.log('user registered!');

        var _req$body = req.body;
        var first_name = _req$body.first_name;
        var mi = _req$body.mi;
        var last_name = _req$body.last_name;
        var phone = _req$body.phone;
        var street = _req$body.street;
        var address_2 = _req$body.address_2;
        var city = _req$body.city;
        var state = _req$body.state;
        var zip = _req$body.zip;

        user.first_name = first_name;
        user.mi = mi;
        user.last_name = last_name;
        user.phone = phone;
        user.street = street;
        user.address_2 = address_2;
        user.city = city;
        user.state = state;
        user.zip = zip;

        user.save().then(function (user) {
          req.login(user, function (err) {
            res.send({
              success: true,
              user: user
            });
          });
        });
      }
    });
  }).catch(function (errors) {
    var validationErrors = (0, _functions.translateValidationErrors)(errors);

    res.send({
      success: false,
      cause: 'validation',
      messages: validationErrors
    });
  });
});

router.get('/logout', function (req, res) {
  res.store.dispatch((0, _AuthActions.logoutUser)());
  req.logout();
  req.session.destroy(function () {
    res.redirect('/auth/login');
  });
});

exports.default = router;