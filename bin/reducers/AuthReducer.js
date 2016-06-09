'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var auth = function auth() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'LOGIN_USER':
      return {
        token: action.token
      };

    case 'LOGOUT_USER':
      return {};

    case 'EXPAND_USER':
      return _extends({
        user: action.user
      }, state);

    default:
      return state;
  }
};

exports.default = auth;