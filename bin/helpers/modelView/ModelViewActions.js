'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchModel = fetchModel;
exports.dumpModelContents = dumpModelContents;

var _functions = require('../functions');

function fetchModel(endpoint, subStore) {
  return function (dispatch, getState) {
    var _getState = getState();

    var modelView = _getState.modelView;
    var auth = _getState.auth;


    dispatch(dumpContents(subStore));
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

      dispatch(receivedModel(res.model, subStore));
    }).catch(function (error) {
      dispatch(gotError(error));
    });
  };
}

function dumpModelContents() {
  var subStore = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  return {
    type: 'MODELVIEW_DUMP_CONTENTS',
    subStore: subStore
  };
}

function beginLoading() {
  return {
    type: 'MODELVIEW_BEGIN_LOADING'
  };
}

function receivedModel(model, subStore) {
  return {
    type: 'MODELVIEW_RECEIVED_MODEL',
    model: model,
    subStore: subStore
  };
}

function gotError(error) {
  return {
    type: 'MODELVIEW_ERROR',
    error: error.message
  };
}