const flexTable = (state = { }, action) => {
  switch (action.type) {

    case 'FLEXTABLE_RECEIVED_CONTENTS':
      return {
        ...state,
        [action.name]: action.contents,
        isLoading: false
      };

    case 'FLEXTABLE_DUMP_CONTENTS':
      if (action.name) {
        return {
          ...state,
          [action.name]: null
        }
      }
      else {
        return {
          isLoading: true
        }
      }

    case 'FLEXTABLE_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case 'FLEXTABLE_BEGIN_LOADING':
      return {
        ...state,
        isLoading: true,
        lastName: action.tableName
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