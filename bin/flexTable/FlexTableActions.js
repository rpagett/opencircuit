'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContents = undefined;

var _functions = require('../helpers/functions');

var fetchContents = exports.fetchContents = function fetchContents(endpoint) {
  return function (dispatch, getState) {
    var _getState = getState();

    var flexTable = _getState.flexTable;


    dispatch(beginLoading());

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

      dispatch(receivedContents(res.contents));
    }).catch(function (error) {
      dispatch(gotError(error));
    });
  };
};

function beginLoading() {
  return {
    type: 'FLEXTABLE_BEGIN_LOADING'
  };
}

function receivedContents(contents) {
  return {
    type: 'FLEXTABLE_RECEIVED_CONTENTS',
    contents: contents
  };
}

function stopLoading() {
  return {
    type: 'FLEXTABLE_STOP_LOADING'
  };
}

function gotError(error) {
  return {
    type: 'FLEXTABLE_ERROR',
    error: error.message
  };
}