'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContents = undefined;
exports.dumpContents = dumpContents;
exports.beginLoading = beginLoading;

var _functions = require('../functions');

var fetchContents = exports.fetchContents = function fetchContents(name, endpoint) {
  return function (dispatch, getState) {
    var _getState = getState();

    var flexTable = _getState.flexTable;
    var auth = _getState.auth;


    dispatch(dumpContents());
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

      dispatch(receivedContents(name, res.contents));
    }).catch(function (error) {
      dispatch(gotError(error));
    });
  };
};

function dumpContents() {
  return {
    type: 'FLEXTABLE_DUMP_CONTENTS'
  };
}

function beginLoading() {
  return {
    type: 'FLEXTABLE_BEGIN_LOADING'
  };
}

function receivedContents(name, contents) {
  return {
    type: 'FLEXTABLE_RECEIVED_CONTENTS',
    name: name,
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