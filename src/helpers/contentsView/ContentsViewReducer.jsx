const contentsView = (state = { }, action) => {
  switch (action.type) {
    case 'CONTENTSVIEW_BEGIN_LOADING':
      return {
        ...state,
        isLoading: true,
      }

    case 'CONTENTSVIEW_DUMP_CONTENTS':
      if (action.subStore) {
        return {
          ...state,
          [action.subStore]: null,
          isLoading: true
        }
      }
      else {
        return {
          isLoading: true
        }
      }

    case 'CONTENTSVIEW_RECEIVED_CONTENTS':
      return {
        ...state,
        [action.subStore]: action.contents,
        isLoading: false
      }

    case 'CONTENTSVIEW_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state;
  }
}

export default contentsView