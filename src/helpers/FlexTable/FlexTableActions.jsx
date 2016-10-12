import { fetchAPI, translateValidationErrors } from '../functions';

export const fetchContents = (name, endpoint) => {
  return (dispatch, getState) => {
    const { flexTable, auth } = getState();

    dispatch(dumpContents(name));
    dispatch(beginLoading());

    fetchAPI(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.user.apiToken
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (!res.success) {
          throw new Error(res.error);
        }

        dispatch(receivedContents(name, res.contents));
      })
      .catch(error => {
        dispatch(gotError(error));
      });
  };
}

export function dumpContents(name = null) {
  if (name == null) {
    var e = new Error('dummy');
    var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
      .replace(/^\s+at\s+/gm, '')
      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
      .split('\n');
    console.log(stack);
  }
  return {
    type: 'FLEXTABLE_DUMP_CONTENTS',
    name
  }
}

export function beginLoading() {
  return {
    type: 'FLEXTABLE_BEGIN_LOADING'
  }
}

export function receivedContents(name, contents) {
  return {
    type: 'FLEXTABLE_RECEIVED_CONTENTS',
    name,
    contents
  }
}

function stopLoading() {
  return {
    type: 'FLEXTABLE_STOP_LOADING'
  }
}

function gotError(error) {
  return {
    type: 'FLEXTABLE_ERROR',
    error: error.message
  }
}