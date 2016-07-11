import { fetchAPI } from '../helpers/functions';

export const fetchModel = endpoint => {
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

        dispatch(receivedModel(res.model));
      })
      .catch(error => {
        dispatch(gotError(error));
      });
  };
}

function beginLoading() {
  return {
    type: 'MODELVIEW_BEGIN_LOADING'
  }
}

function receivedModel(model) {
  return {
    type: 'MODELVIEW_RECEIVED_MODEL',
    model
  }
}

function gotError(error) {
  return {
    type: 'MODELVIEW_ERROR',
    error: error.message
  }
}