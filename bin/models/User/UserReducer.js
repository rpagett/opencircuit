'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var users = exports.users = function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'USER_PROFILE_CLEAR_ERRORS':
      return _extends({}, state, {
        profileError: ''
      });

    case 'USER_PROFILE_RECEIVED_DATA':
      return _extends({}, state, {
        profileUser: action.user,
        profileLoading: false
      });

    case 'USER_PROFILE_ERROR':
      return _extends({}, state, {
        profileError: action.error,
        profileLoading: false
      });

    case 'USER_PROFILE_BEGIN_LOADING':
      return _extends({}, state, {
        profileLoading: true
      });

    case 'USER_PROFILE_STOP_LOADING':
      return _extends({}, state, {
        profileLoading: false
      });

    default:
      return state;
  }
};

exports.default = users;