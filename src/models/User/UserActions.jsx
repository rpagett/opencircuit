import { fetchAPI, translateValidationErrors } from '../../helpers/functions';

export const fetchProfile = (email) => {
  return (dispatch, getState) => {
    const { users } = getState();

    dispatch(profileBeginLoading());
    dispatch(profileClearErrors());

    fetchAPI(`/api/users/${email}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (!res.success) {
          throw new Error(res.error);
        }

        dispatch(profileReceivedData(res.model));
      })
      .catch(error => {
        dispatch(profileError(error));
      });
  }
}

function profileClearErrors() {
  return {
    type: 'USER_PROFILE_CLEAR_ERRORS'
  }
}

function profileBeginLoading() {
  return {
    type: 'USER_PROFILE_BEGIN_LOADING'
  }
}

function profileStopLoading() {
  return {
    type: 'USER_PROFILE_STOP_LOADING'
  }
}

function profileReceivedData(user) {
  return {
    type: 'USER_PROFILE_RECEIVED_DATA',
    user: user
  }
}

function profileError(error) {
  return {
    type: 'USER_PROFILE_ERROR',
    error: error.toString()
  }
}
