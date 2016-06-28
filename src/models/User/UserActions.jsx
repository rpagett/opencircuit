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
        dispatch(listError(error.message));
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
        dispatch(editStopLoading());
        console.log('Made it to end');
      })
      .catch(error => {
        console.log('In catch block', error);
        dispatch(editError(error));
      });
  }
}

function receivedEditData(user) {
  console.log('Dispatching!');
  return {
    type: 'FORM_RECEIVED_DATA',
    formStore: 'user_edit',
    model: user
  }
}

export function submitEditData(formData) {
  return dispatch => {
    fetchAPI(`/api/users/${formData.get('email')}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: formData
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
      .catch(errors => {
        dispatch(submissionError(errors));
      })
  }
}

function submissionError(errors) {
  return {
    type: 'USER_EDIT_SUBMISSION_ERROR',
    errors: errors
  }
}
