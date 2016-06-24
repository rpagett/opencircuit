'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProfile = exports.fetchUserList = undefined;

var _functions = require('../../helpers/functions');

var fetchUserList = exports.fetchUserList = function fetchUserList(endpoint) {
  var addedBody = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (dispatch, getState) {
    var _getState = getState();

    var users = _getState.users;


    dispatch(listBeginLoading());

    (0, _functions.fetchAPI)(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: addedBody
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (!res.success) {
        throw new Error(res.error);
      }

      dispatch(listReceivedUsers(res.users));
    }).catch(function (error) {
      dispatch(listError(error.toString()));
    });
  };
};

function listBeginLoading() {
  return {
    type: 'USER_LIST_BEGIN_LOADING'
  };
}

function listReceivedUsers(users) {
  return {
    type: 'USER_LIST_RECEIVED_USERS',
    users: users
  };
}

function listStopLoading() {
  return {
    type: 'USER_LIST_STOP_LOADING'
  };
}

function listError(error) {
  return {
    type: 'USER_LIST_ERROR',
    error: error
  };
}

var fetchProfile = exports.fetchProfile = function fetchProfile(email) {
  return function (dispatch, getState) {
    var _getState2 = getState();

    var users = _getState2.users;


    if (users.profileUser && users.profileUser.email === email) {
      dispatch(profileStopLoading());
      return;
    }

    dispatch(profileBeginLoading());
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

      dispatch(profileReceivedData(res.user));
    }).catch(function (error) {
      dispatch(profileError(error));
    });
  };
};

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
    error: error
  };
}