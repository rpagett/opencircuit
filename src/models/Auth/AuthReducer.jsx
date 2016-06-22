const auth = (state = { }, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        user: action.user
      }

    case 'LOGOUT_USER':
      return { }

    default:
      return state;
  }
}

export default auth;