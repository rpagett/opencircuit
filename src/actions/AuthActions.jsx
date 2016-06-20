export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    token: user._id
  }
}

export const logoutUser = (user) => {
  return {
    type: 'LOGOUT_USER',
    token: user._id
  }
}