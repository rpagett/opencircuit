const auth = (state = { }, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        token: action.token
      }

    case 'LOGOUT_USER':
      return { }

    case 'EXPAND_USER':
      return {
        user: action.user,
        ...state
      }

    default:
      return state;
  }
}

export default auth;