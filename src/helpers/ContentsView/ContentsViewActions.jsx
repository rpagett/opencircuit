import { fetchAPI } from '../functions';

export const fetchContents = (endpoint, subStore) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch(dumpContents(subStore))
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

        dispatch(receivedContents(res.contents, subStore));
      })
      .catch(error => {
        console.log('Catching a contents view error', error);
        dispatch(gotError(error));
      });
  };
}

function beginLoading() {
  return {
    type: 'CONTENTSVIEW_BEGIN_LOADING'
  }
}

export function dumpContents(subStore = null) {
  return {
    type: 'CONTENTSVIEW_DUMP_CONTENTS',
    subStore
  }
}

export function dumpModelContents(subStore = null) {
  return {
    type: 'MODELVIEW_DUMP_CONTENTS',
    subStore
  }
}

export const dumpTheThing = (substore = null) => {
  return {
    type: 'MODELVIEW_DUMP_CONTENTS',
    subStore: substore
  }
}

function receivedContents(contents, subStore) {
  return {
    type: 'CONTENTSVIEW_RECEIVED_CONTENTS',
    contents,
    subStore
  }
}

function gotError(error) {
  return {
    type: 'CONTENTSVIEW_ERROR',
    error: error.message
  }
}