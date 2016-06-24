//import Immutable from 'immutable';
//
//const initialState = Immutable.Map({
//  listUsers: null,
//  listError: null
//});

export const users = (state = { }, action) => {
  switch (action.type) {
    case 'USER_LIST_RECEIVED_USERS':
      return {
        ...state,
        listUsers: action.users,
        listLoading: false
      };

    case 'USER_LIST_ERROR':
      return {
        ...state,
        listError: action.error,
        listLoading: false
      }

    case 'USER_LIST_BEGIN_LOADING':
      return {
        ...state,
        listLoading: true
      }

    case 'USER_LIST_STOP_LOADING':
      return {
        ...state,
        listLoading: false
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
        profileLoading: true
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