'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchModel = undefined;

var _functions = require('../functions');

var fetchModel = exports.fetchModel = function fetchModel(endpoint) {
  return function (dispatch, getState) {
    var _getState = getState();

    var modelView = _getState.modelView;
    var auth = _getState.auth;


    dispatch(beginLoading());

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

      dispatch(receivedModel(res.model));
    }).catch(function (error) {
      dispatch(gotError(error));
    });
  };
};

function beginLoading() {
  return {
    type: 'MODELVIEW_BEGIN_LOADING'
  };
}

function receivedModel(model) {
  return {
    type: 'MODELVIEW_RECEIVED_MODEL',
    model: model
  };
}

function gotError(error) {
  return {
    type: 'MODELVIEW_ERROR',
    error: error.message
  };
}