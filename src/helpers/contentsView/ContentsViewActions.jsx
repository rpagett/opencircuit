import { fetchAPI } from '../functions';

export const fetchContents = endpoint => {
  return (dispatch, getState) => {
    const { modelView, auth } = getState();

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

        dispatch(receivedContents(res.contents));
      })
      .catch(error => {
        dispatch(gotError(error));
      });
  };
}

function beginLoading() {
  return {
    type: 'CONTENTSVIEW_BEGIN_LOADING'
  }
}

function receivedContents(contents) {
  return {
    type: 'CONTENTSVIEW_RECEIVED_CONTENTS',
    contents
  }
}

function gotError(error) {
  return {
    type: 'CONTENTSVIEW_ERROR',
    error: error.message
  }
}