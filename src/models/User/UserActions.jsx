import { SubmissionError } from 'redux-form';
import { fetchAPI, translateValidationErrors } from '../../helpers/functions';

export const fetchUserList = (endpoint, addedBody = { }) => {
  return (dispatch, getState) => {
    const { users } = getState();

    dispatch(listBeginLoading());

    fetchAPI(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: addedBody
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error);
        }

        dispatch(listReceivedUsers(res.users));
      })
      .catch((error) => {
        dispatch(listError(error.toString()));
      });
  };
}

function listBeginLoading() {
  return {
    type: 'USER_LIST_BEGIN_LOADING'
  }
}

function listReceivedUsers(users) {
  return {
    type: 'USER_LIST_RECEIVED_USERS',
    users: users
  }
}

function listStopLoading() {
  return {
    type: 'USER_LIST_STOP_LOADING'
  }
}

function listError(error) {
  return {
    type: 'USER_LIST_ERROR',
    error: error
  }
}

export const fetchProfile = (email) => {
  return (dispatch, getState) => {
    const { users } = getState();

    if (users.profileUser && users.profileUser.email === email) {
      dispatch(profileStopLoading());
      return;
    }

    dispatch(profileBeginLoading());
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

        dispatch(profileReceivedData(res.user));
      })
      .catch(error => {
        dispatch(profileError(error));
      });
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
    error: error
  }
}

function editBeginLoading() {
  return {
    type: 'USER_EDIT_BEGIN_LOADING'
  }
}

function editStopLoading() {
  return {
    type: 'USER_EDIT_STOP_LOADING'
  }
}

export function editError(error) {
  return {
    type: 'USER_EDIT_ERROR',
    error: error
  }
}

export function fetchEditData(email) {
  return dispatch => {
    dispatch(editBeginLoading());
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

        dispatch(receivedEditData(res.user));
      })
      .catch(error => {
        dispatch(editError(error));
      });
  }
}

function receivedEditData(user) {
  return {
    type: 'USER_EDIT_RECEIVED_DATA',
    user: user
  }
}

export function submitEditData(values) {
  return dispatch => {
    return fetchAPI(`/api/users/${values.email}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(values)
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success === true) {
          console.log('Success!', res);
          return res;
        }
        else {
          console.log('Errors', res.errors);
          const errors = translateValidationErrors(res.errors);
          console.log('Translated', errors)
          throw new Error(errors);
        }
      })
      //.catch(errors => {
      //  submissionError(errors);
      //})
  }
}

function submissionError(errors) {
  console.log('ERRORS', errors);
  throw new SubmissionError(errors);
}
