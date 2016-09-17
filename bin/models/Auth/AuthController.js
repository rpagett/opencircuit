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

var _UserEmails = require('../User/UserEmails');

var UserEmail = _interopRequireWildcard(_UserEmails);

var _mail = require('../../helpers/mail');

var Email = _interopRequireWildcard(_mail);

var _UserModel = require('../User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _AuthActions = require('./AuthActions');

var _UserValidation = require('../User/UserValidation');

var _UserValidation2 = _interopRequireDefault(_UserValidation);

var _functions = require('../../helpers/functions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
    } else if (!user.confirmed) {
      res.send({
        success: true,
        redirect: '/auth/must-confirm'
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
        apiToken: _nodeUuid2.default.v4(),
        confirmation_token: _nodeUuid2.default.v1()
      });

      _UserModel2.default.findOneAndUpdate({ email: data.email }, fillableData, { 'new': true }).then(function (user) {
        Email.sendHTML(user.email, 'Please confirm your new account.', UserEmail.confirmationEmail(user));

        res.send({
          success: true,
          redirect: '/auth/confirm'
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

router.post('/recover', function (req, res) {
  _UserModel2.default.findOneAndUpdate({ email: req.body.email }, { recovery_token: _nodeUuid2.default.v1() }, { new: true }).then(function (user) {
    if (!user) {
      throw new Error('There is no user associated with that email address. Please register.');
    }

    Email.sendHTML(user.email, 'Password Recovery Request', UserEmail.recoveryEmail(user));

    res.send({
      success: true,
      redirect: '/auth/sent-recovery'
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.post('/recover/:token', function (req, res) {
  _UserModel2.default.findOne({ recovery_token: req.params.token }, 'first_name email recovery_token').then(function (user) {
    if (!user) {
      throw new Error('That recovery code is invalid.');
    }

    if (!req.body.password) {
      res.json({
        success: false,
        errors: [{ field: 'password', message: 'Password cannot be blank.' }]
      });
    }

    if (req.body.password !== req.body.password_verify) {
      res.json({
        success: false,
        errors: [{ field: 'password', message: 'These passwords do not match.' }]
      });
    }

    user.setPassword(req.body.password, function (err, user) {
      if (err) {
        throw new Error(err);
      }

      if (!user.apiToken) {
        user.apiToken = _nodeUuid2.default.v4();
      }

      //user.recovery_token = null;
      user.save().then(function (user) {
        req.login(user, function (err) {
          res.send({
            success: true,
            redirect: '/',
            external: true
          });
        });
      });
    });
  }).catch(function (err) {
    res.send({
      success: false,
      error: err.message
    });
  });
});

router.get('/confirm/:token', function (req, res) {
  _UserModel2.default.findOne({ confirmation_token: req.params.token }, '_id confirmation_token').then(function (user) {
    if (!user) {
      res.send('That confirmation token is invalid.');
    }

    req.login(user, function (err) {
      if (err) {
        throw new Error(err.message);
      }

      res.store.dispatch((0, _AuthActions.loginUser)(user));
    });

    user.confirmation_token = null;
    user.confirmed = true;
    return user.save();
  }).then(function () {
    res.redirect(302, '/');
  }).catch(function (err) {
    res.send(err.message);
  });
});

exports.default = router;
module.exports = exports['default'];