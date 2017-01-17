'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var auth = function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'LOGIN_USER':
      return {
        user: action.user
      };

    case 'LOGOUT_USER':
      return {};

    default:
      return state;
  }
};

exports.default = auth;
module.exports = exports['default'];