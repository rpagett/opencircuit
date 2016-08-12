import { fetchAPI, translateValidationErrors } from '../functions';

export const fetchContents = (name, endpoint) => {
  return (dispatch, getState) => {
    const { flexTable, auth } = getState();

    dispatch(dumpContents());
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

export function dumpContents() {
  return {
    type: 'FLEXTABLE_DUMP_CONTENTS'
  }
}

export function beginLoading() {
  return {
    type: 'FLEXTABLE_BEGIN_LOADING'
  }
}

function receivedContents(name, contents) {
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