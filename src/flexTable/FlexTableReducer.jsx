const flexTable = (state = { }, action) => {
  switch (action.type) {

    case 'FLEXTABLE_RECEIVED_CONTENTS':
      return {
        contents: action.contents,
        isLoading: false
      };

    case 'FLEXTABLE_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case 'FLEXTABLE_BEGIN_LOADING':
      return {
        ...state,
        isLoading: true
      }

    case 'FLEXTABLE_STOP_LOADING':
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
  }
}

export default flexTable;