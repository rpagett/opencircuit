'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateField = updateField;
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
  return function (dispatch) {
    if (!endpoint) {
      dispatch(initializeSubstore(subStore));
      dispatch(stopLoading(subStore));
      return;
    }

    dispatch(beginLoading(subStore));
    (0, _functions.fetchAPI)(endpoint, {
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

    var _getState = getState();

    var form = _getState.form;


    return (0, _functions.fetchAPI)(endpoint, {
      credentials: 'same-origin',
      method: submitMethod,
      body: JSON.stringify(form[subStore])
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (res.success === true) {
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