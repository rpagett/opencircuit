import UserRepository from '../repositories/UserRepository';

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

export const expandUser = (token) => {
  let user = UserRepository.findByToken(token);

  if (user) {
    return {
      type: 'EXPAND_USER',
      user: user
    }
  }
}