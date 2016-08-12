const contentsView = (state = { }, action) => {
  switch (action.type) {
    case 'CONTENTSVIEW_BEGIN_LOADING':
      return {
        ...state,
        isLoading: true
      }

    case 'CONTENTSVIEW_RECEIVED_CONTENTS':
      return {
        contents: action.contents,
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