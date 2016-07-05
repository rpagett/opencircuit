const initialState = {
  loading: { },
  globalErrors: { }
}

const form = (state = initialState, action) => {
  switch (action.type) {

    case 'FORM_INITIALIZE_SUBSTORE':
      return {
        ...state,
        [action.subStore]: { },
        [action.subStore + '_errors']: { }
      }

    case 'FORM_RECEIVED_DATA':
      return {
        ...state,
        [action.subStore]: action.model,
        [action.subStore + '_errors']: { }
      }

    case 'FORM_UPDATE_FIELD_VALUE':
      return {
        ...state,
        [action.subStore]: {
          ...state[action.subStore],
          [action.field]: action.value
        }
      }

    case 'FORM_UPDATE_CHECKBOX':
      return {
        ...state,
        [action.subStore]: {
          ...state[action.subStore],
          [action.field]: {
            ...state[action.subStore][action.field],
            [action.value]: action.checked
          }
        }
      }

    case 'FORM_BEGIN_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.subStore]: true
        }
      }

    case 'FORM_STOP_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.subStore]: false
        }
      }

    case 'FORM_GLOBAL_ERROR':
      return {
        ...state,
        globalErrors: {
          ...state.globalErrors,
          [action.subStore]: action.error.toString()
        }
      }

    case 'FORM_CLEAR_ERRORS':
      return {
        ...state,
        [action.subStore + '_errors']: { }
      }

    case 'FORM_SUBMISSION_ERRORS':
      console.log('Applying errors', action.errors);
      return {
        ...state,
        [action.subStore + '_errors']: {
          ...action.errors
        }
      }

    default:
      return state
  }
}

export default form;