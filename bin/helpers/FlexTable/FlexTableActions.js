'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContents = undefined;
exports.dumpContents = dumpContents;
exports.beginLoading = beginLoading;
exports.receivedContents = receivedContents;

var _functions = require('../functions');

var fetchContents = exports.fetchContents = function fetchContents(name, endpoint) {
  return function (dispatch, getState) {
    var _getState = getState(),
        flexTable = _getState.flexTable,
        auth = _getState.auth;

    dispatch(dumpContents(name));
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
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (name == null) {
    var e = new Error('dummy');
    var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@').split('\n');
    console.log(stack);
  }
  return {
    type: 'FLEXTABLE_DUMP_CONTENTS',
    name: name
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