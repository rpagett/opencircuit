'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loginUser = exports.loginUser = function loginUser(user) {
  return {
    type: 'LOGIN_USER',
    user: user
  };
};

var logoutUser = exports.logoutUser = function logoutUser() {
  return {
    type: 'LOGOUT_USER'
  };
};