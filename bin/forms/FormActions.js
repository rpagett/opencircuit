'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateField = updateField;
exports.updateCheckbox = updateCheckbox;
exports.fetchData = fetchData;
exports.submitData = submitData;

var _functions = require('../helpers/functions');

function initializeSubstore(subStore) {
  return {
    type: 'FORM_INITIALIZE_SUBSTORE',
    subStore: subStore
  };
}

function updateField(subStore, field, value) {
  return {
    type: 'FORM_UPDATE_FIELD_VALUE',
    subStore: subStore,
    field: field,
    value: value
  };
}

function updateCheckbox(subStore, field, value, checked) {
  return {
    type: 'FORM_UPDATE_CHECKBOX',
    subStore: subStore,
    field: field,
    value: value,
    checked: checked ? true : false
  };
}

function beginLoading(subStore) {
  return {
    type: 'FORM_BEGIN_LOADING',
    subStore: subStore
  };
}

function stopLoading(subStore) {
  return {
    type: 'FORM_STOP_LOADING',
    subStore: subStore
  };
}

function setError(subStore, error) {
  return {
    type: 'FORM_GLOBAL_ERROR',
    subStore: subStore,
    error: error
  };
}

function fetchData(subStore, endpoint) {
  return function (dispatch, getState) {
    if (!endpoint) {
      if (!getState().form[subStore]) {
        dispatch(initializeSubstore(subStore));
      }
      dispatch(stopLoading(subStore));
      return;
    }

    var _getState = getState();

    var auth = _getState.auth;

    dispatch(beginLoading(subStore));
    (0, _functions.fetchAPI)(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.user.apiToken
      }
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (!res.success) {
        throw new Error(res.error);
      }

      dispatch(receivedData(subStore, res.model));
      dispatch(stopLoading(subStore));
      console.log('Made it to end');
    }).catch(function (error) {
      console.log('In catch block', error);
      dispatch(setError(subStore, error));
    });
  };
}

function receivedData(subStore, model) {
  return {
    type: 'FORM_RECEIVED_DATA',
    subStore: subStore,
    model: model
  };
}

function submitData(subStore, submitMethod, endpoint) {
  return function (dispatch, getState) {
    dispatch(beginLoading(subStore));
    dispatch(clearErrors(subStore));

    var _getState2 = getState();

    var form = _getState2.form;
    var auth = _getState2.auth;


    return (0, _functions.fetchAPI)(endpoint, {
      credentials: 'same-origin',
      method: submitMethod,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.user && auth.user.apiToken
      },
      body: JSON.stringify(form[subStore])
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (res.success === true) {
        dispatch(initializeSubstore(subStore));
        return res;
      } else {
        throw (0, _functions.translateValidationErrors)(res.errors);
      }
    }).catch(function (errors) {
      dispatch(stopLoading(subStore));
      dispatch(submissionError(subStore, errors));
    });
  };
}

function clearErrors(subStore) {
  return {
    type: 'FORM_CLEAR_ERRORS',
    subStore: subStore
  };
}

function submissionError(subStore, errors) {
  return {
    type: 'FORM_SUBMISSION_ERRORS',
    subStore: subStore,
    errors: errors
  };
}