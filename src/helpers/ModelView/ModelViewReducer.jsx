const modelView = (state = { }, action) => {
  switch (action.type) {
    case 'MODELVIEW_BEGIN_LOADING':
      return {
        ...state,
        isLoading: true
      }

    case 'MODELVIEW_DUMP_CONTENTS':
      if (action.subStore) {
        return {
          ...state,
          error: null,
          [action.subStore]: null,
          isLoading: true
        }
      }

      return {
        isLoading: true
      }

    case 'MODELVIEW_RECEIVED_MODEL':
      return {
        ...state,
        [action.subStore]: action.model,
        isLoading: false
      }

    case 'MODELVIEW_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state;
  }
}

export default modelView