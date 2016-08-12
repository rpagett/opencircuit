'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContents = undefined;

var _functions = require('../functions');

var fetchContents = exports.fetchContents = function fetchContents(endpoint) {
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

      dispatch(receivedContents(res.contents));
    }).catch(function (error) {
      dispatch(gotError(error));
    });
  };
};

function beginLoading() {
  return {
    type: 'CONTENTSVIEW_BEGIN_LOADING'
  };
}

function receivedContents(contents) {
  return {
    type: 'CONTENTSVIEW_RECEIVED_CONTENTS',
    contents: contents
  };
}

function gotError(error) {
  return {
    type: 'CONTENTSVIEW_ERROR',
    error: error.message
  };
}