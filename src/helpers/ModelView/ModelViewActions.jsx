import { fetchAPI } from '../functions';

export const fetchModel = (endpoint, subStore) => {
  return (dispatch, getState) => {
    const { modelView, auth } = getState();

    dispatch(dumpContents(subStore));
    dispatch(beginLoading(subStore));

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

        dispatch(receivedModel(res.model, subStore));
      })
      .catch(error => {
        dispatch(gotError(error));
      });
  };
}

export function dumpContents(subStore = null) {
  return {
    type: 'MODELVIEW_DUMP_CONTENTS',
    subStore
  }
}

function beginLoading() {
  return {
    type: 'MODELVIEW_BEGIN_LOADING'
  }
}

function receivedModel(model, subStore) {
  return {
    type: 'MODELVIEW_RECEIVED_MODEL',
    model,
    subStore
  }
}

function gotError(error) {
  return {
    type: 'MODELVIEW_ERROR',
    error: error.message
  }
}