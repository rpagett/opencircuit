'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContents = undefined;
exports.dumpContents = dumpContents;
exports.dumpModelContents = dumpModelContents;

var _functions = require('../functions');

var fetchContents = exports.fetchContents = function fetchContents(endpoint, subStore) {
  return function (dispatch, getState) {
    var _getState = getState();

    var auth = _getState.auth;


    dispatch(dumpContents(subStore));
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

      dispatch(receivedContents(res.contents, subStore));
    }).catch(function (error) {
      console.log('Catching a contents view error', error);
      dispatch(gotError(error));
    });
  };
};

function beginLoading() {
  return {
    type: 'CONTENTSVIEW_BEGIN_LOADING'
  };
}

function dumpContents() {
  var subStore = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  return {
    type: 'CONTENTSVIEW_DUMP_CONTENTS',
    subStore: subStore
  };
}

function dumpModelContents() {
  var subStore = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  return {
    type: 'MODELVIEW_DUMP_CONTENTS',
    subStore: subStore
  };
}

function receivedContents(contents, subStore) {
  return {
    type: 'CONTENTSVIEW_RECEIVED_CONTENTS',
    contents: contents,
    subStore: subStore
  };
}

function gotError(error) {
  return {
    type: 'CONTENTSVIEW_ERROR',
    error: error.message
  };
}