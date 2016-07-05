export const users = (state = { }, action) => {
  switch (action.type) {
    case 'USER_PROFILE_CLEAR_ERRORS':
      return {
        ...state,
        profileError: ''
      }

    case 'USER_PROFILE_RECEIVED_DATA':
      return {
        ...state,
        profileUser: action.user,
        profileLoading: false
      }

    case 'USER_PROFILE_ERROR':
      return {
        ...state,
        profileError: action.error,
        profileLoading: false
      }

    case 'USER_PROFILE_BEGIN_LOADING':
      return {
        ...state,
        profileLoading: true,
      }

    case 'USER_PROFILE_STOP_LOADING':
      return {
        ...state,
        profileLoading: false
      }

    default:
      return state;
  }
}

export default users;