'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandUser = exports.logoutUser = exports.loginUser = undefined;

var _UserRepository = require('../repositories/UserRepository');

var _UserRepository2 = _interopRequireDefault(_UserRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginUser = exports.loginUser = function loginUser(user) {
  return {
    type: 'LOGIN_USER',
    token: user._id
  };
};

var logoutUser = exports.logoutUser = function logoutUser(user) {
  return {
    type: 'LOGOUT_USER',
    token: user._id
  };
};

var expandUser = exports.expandUser = function expandUser(token) {
  var user = _UserRepository2.default.findByToken(token);

  if (user) {
    return {
      type: 'EXPAND_USER',
      user: user
    };
  }
};