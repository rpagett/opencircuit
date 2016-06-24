import { combineReducers } from 'redux';

// import reducers
import auth from './models/Auth/AuthReducer';
import users from './models/User/UserReducer';

// combine reducers
export const appReducers = combineReducers({
  auth,
  users
});