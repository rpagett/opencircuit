import { fetchAPI, translateValidationErrors } from '../helpers/functions';

function initializeSubstore(subStore) {
  return {
    type: 'FORM_INITIALIZE_SUBSTORE',
    subStore
  }
}

export function updateField(subStore, field, value) {
  return {
    type: 'FORM_UPDATE_FIELD_VALUE',
    subStore,
    field,
    value
  }
}

export function updateCheckbox(subStore, field, value, checked) {
  return {
    type: 'FORM_UPDATE_CHECKBOX',
    subStore,
    field,
    value,
    checked: (checked ? true : false)
  }
}

function beginLoading(subStore) {
  return {
    type: 'FORM_BEGIN_LOADING',
    subStore
  }
}

function stopLoading(subStore) {
  return {
    type: 'FORM_STOP_LOADING',
    subStore
  }
}

function setError(subStore, error) {
  return {
    type: 'FORM_GLOBAL_ERROR',
    subStore,
    error
  }
}

export function fetchData(subStore, endpoint) {
  return (dispatch, getState) => {
    if (!endpoint) {
      if (!getState().form[subStore]) {
        dispatch(initializeSubstore(subStore));
      }
      dispatch(stopLoading(subStore));
      return;
    }

    const { auth } = getState();
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
        return res.json()
      })
      .then(res => {
        if (!res.success) {
          throw new Error(res.error);
        }

        dispatch(receivedData(subStore, res.model));
        dispatch(stopLoading(subStore));
        console.log('Made it to end');
      })
      .catch(error => {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
  }
}

function receivedData(subStore, model) {
  return {
    type: 'FORM_RECEIVED_DATA',
    subStore,
    model
  }
}

export function submitData(subStore, submitMethod, endpoint) {
  return (dispatch, getState) => {
    dispatch(beginLoading(subStore));
    dispatch(clearErrors(subStore));

    const { form, auth } = getState();

    return fetchAPI(endpoint, {
      credentials: 'same-origin',
      method: submitMethod,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.user && auth.user.apiToken
      },
      body: JSON.stringify(form[subStore])
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success === true) {
          dispatch(initializeSubstore(subStore));
          return res;
        }
        else {
          throw translateValidationErrors(res.errors);
        }
      })
      .catch(errors => {
        dispatch(stopLoading(subStore));
        dispatch(submissionError(subStore, errors));
      })
  }
}

function clearErrors(subStore) {
  return {
    type: 'FORM_CLEAR_ERRORS',
    subStore
  }
}

function submissionError(subStore, errors) {
  return {
    type: 'FORM_SUBMISSION_ERRORS',
    subStore,
    errors
  }
}