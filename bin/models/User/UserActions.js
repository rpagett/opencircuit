'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProfile = exports.fetchUserList = undefined;
exports.editError = editError;
exports.fetchEditData = fetchEditData;
exports.submitEditData = submitEditData;

var _reduxForm = require('redux-form');

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
      dispatch(listError(error.message));
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

function editBeginLoading() {
  return {
    type: 'USER_EDIT_BEGIN_LOADING'
  };
}

function editStopLoading() {
  return {
    type: 'USER_EDIT_STOP_LOADING'
  };
}

function editError(error) {
  return {
    type: 'USER_EDIT_ERROR',
    error: error
  };
}

function fetchEditData(email) {
  return function (dispatch) {
    dispatch(editBeginLoading());
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

      dispatch(receivedEditData(res.user));
      dispatch(editStopLoading());
      console.log('Made it to end');
    }).catch(function (error) {
      console.log('In catch block', error);
      dispatch(editError(error));
    });
  };
}

function receivedEditData(user) {
  console.log('Dispatching!');
  return {
    type: 'FORM_RECEIVED_DATA',
    formStore: 'user_edit',
    model: user
  };
}

function submitEditData(formData) {
  return function (dispatch) {
    (0, _functions.fetchAPI)('/api/users/' + formData.get('email'), {
      credentials: 'same-origin',
      method: 'PATCH',
      body: formData
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (res.success === true) {
        console.log('Success!', res);
        return res;
      } else {
        console.log('Errors', res.errors);
        var errors = (0, _functions.translateValidationErrors)(res.errors);
        console.log('Translated', errors);
        throw new Error(errors);
      }
    }).catch(function (errors) {
      dispatch(submissionError(errors));
    });
  };
}

function submissionError(errors) {
  return {
    type: 'USER_EDIT_SUBMISSION_ERROR',
    errors: errors
  };
}