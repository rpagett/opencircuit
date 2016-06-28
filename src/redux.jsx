import { combineReducers } from 'redux';

// import reducers
import auth from './models/Auth/AuthReducer';
//import { reducer as formReducer } from 'redux-form';
import form from './forms/FormReducer';
import users from './models/User/UserReducer';

// combine reducers
export const appReducers = combineReducers({
  auth,
  form,
  users
});