'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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