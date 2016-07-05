import { fetchAPI, translateValidationErrors } from '../helpers/functions';

export const fetchContents = endpoint => {
  return (dispatch, getState) => {
    const { flexTable, auth } = getState();

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
    type: 'FLEXTABLE_BEGIN_LOADING'
  }
}

function receivedContents(contents) {
  return {
    type: 'FLEXTABLE_RECEIVED_CONTENTS',
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