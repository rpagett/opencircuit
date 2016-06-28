'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//import Immutable from 'immutable';
//
//const initialState = Immutable.Map({
//  listUsers: null,
//  listError: null
//});

var users = exports.users = function users() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'USER_LIST_RECEIVED_USERS':
      return _extends({}, state, {
        listUsers: action.users,
        listLoading: false
      });

    case 'USER_LIST_ERROR':
      return _extends({}, state, {
        listError: action.error,
        listLoading: false
      });

    case 'USER_LIST_BEGIN_LOADING':
      return _extends({}, state, {
        listLoading: true
      });

    case 'USER_LIST_STOP_LOADING':
      return _extends({}, state, {
        listLoading: false
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

    case 'USER_EDIT_RECEIVED_DATA':
      return _extends({}, state, {
        editFormData: action.user,
        editFormLoading: false
      });

    case 'USER_EDIT_ERROR':
      return _extends({}, state, {
        editFormLoading: false,
        editFormError: action.error.toString()
      });

    case 'USER_EDIT_BEGIN_LOADING':
      return _extends({}, state, {
        editFormLoading: true
      });

    case 'USER_EDIT_STOP_LOADING':
      return _extends({}, state, {
        editFormLoading: false
      });

    case 'USER_EDIT_SUBMISSION_ERROR':
      return _extends({}, state, {
        editFormErrors: action.errors
      });

    default:
      return state;
  }
};

exports.default = users;