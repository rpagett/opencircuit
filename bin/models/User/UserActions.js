'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProfile = undefined;

var _functions = require('../../helpers/functions');

var fetchProfile = exports.fetchProfile = function fetchProfile(email) {
  return function (dispatch, getState) {
    var _getState = getState();

    var users = _getState.users;


    dispatch(profileBeginLoading());
    dispatch(profileClearErrors());

    (0, _functions.fetchAPI)('/api/users/' + email, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (!res.success) {
        throw new Error(res.error);
      }

      dispatch(profileReceivedData(res.model));
    }).catch(function (error) {
      dispatch(profileError(error));
    });
  };
};

function profileClearErrors() {
  return {
    type: 'USER_PROFILE_CLEAR_ERRORS'
  };
}

function profileBeginLoading() {
  return {
    type: 'USER_PROFILE_BEGIN_LOADING'
  };
}

function profileStopLoading() {
  return {
    type: 'USER_PROFILE_STOP_LOADING'
  };
}

function profileReceivedData(user) {
  return {
    type: 'USER_PROFILE_RECEIVED_DATA',
    user: user
  };
}

function profileError(error) {
  return {
    type: 'USER_PROFILE_ERROR',
    error: error.toString()
  };
}