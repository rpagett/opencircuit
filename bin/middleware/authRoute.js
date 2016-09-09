'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userOrAdmin = userOrAdmin;
exports.hasRole = hasRole;

var _UserModel = require('../models/User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _UserRoles = require('../models/User/UserRoles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userOrAdmin() {
  return function (req, res, next) {
    var authToken = req.get('Authorization');

    if (!authToken) {
      res.status(403).send({
        success: false,
        error: 'Access denied.'
      });
    }

    _UserModel2.default.findOne({ apiToken: authToken }, 'email roles apiToken').then(function (user) {
      if (!user) {
        res.status(403).send({
          success: false,
          error: 'Access denied.'
        });
      }

      if (user.email !== req.body.email && !(0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator)) {
        res.status(403).send({
          success: false,
          error: 'Access denied.'
        });
      }

      next();
    });
  };
}

function hasRole() {
  var role = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  return function (req, res, next) {
    var authToken = req.get('Authorization');

    if (!authToken) {
      res.status(403).send({
        success: false,
        error: 'Access denied.'
      });
    }

    _UserModel2.default.findOne({ apiToken: authToken }, 'roles apiToken').then(function (user) {
      if (!user) {
        res.status(403).send({
          success: false,
          error: 'Access denied.'
        });
      }

      if (role && !(0, _UserRoles.userHasRole)(user, role)) {
        res.status(403).send({
          success: false,
          error: 'Access denied.'
        });
      }

      next();
    }).catch(function (err) {
      res.status(403).send({
        success: false,
        error: err.message
      });
    });
  };
}