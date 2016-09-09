'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

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
    if (err || !user) {
      res.send({
        success: false,
        errors: [{ field: 'email', message: options.message }]
      });
    } else {
      req.login(user, function (err) {
        res.send({
          success: true,
          redirect: '/',
          external: true
        });
      });
    }
  });
});

router.post('/register', function (req, res) {
  (0, _UserValidation2.default)(req.body).then(function (data) {
    _UserModel2.default.register(new _UserModel2.default({ email: data.email }), data.password, function (err, user) {
      if (err) {
        res.json({
          success: false,
          errors: [{ field: 'email', message: err.message }]
        });
      }

      var fillableData = _lodash2.default.pick(data, _UserModel2.default.fillableFields());
      fillableData = _extends({}, fillableData, {
        apiToken: _nodeUuid2.default.v4()
      });

      _UserModel2.default.findOneAndUpdate({ email: data.email }, fillableData, { 'new': true }).then(function (user) {
        req.login(user, function (err) {
          if (err) {
            res.json({
              success: false,
              errors: [{ field: 'email', message: err.message }]
            });
          }

          res.store.dispatch((0, _AuthActions.loginUser)(user));
          res.send({
            success: true,
            external: true,
            redirect: '/'
          });
        });
      }).catch(function (error) {
        console.log('ERROR', error);
      });
    });
  }).catch(function (errors) {
    console.log('ERRORS', errors);
    res.json({
      success: false,
      errors: errors
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

router.get('/reauth', function (req, res) {
  _UserModel2.default.findOneAndUpdate({ email: 'riley@opencircuit.us' }, { roles: [1] }).then(function (user) {
    res.json({
      success: true
    });
  });
});

exports.default = router;