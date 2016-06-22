import { combineReducers, createStore } from 'redux';

// import reducers
import auth from './models/Auth/AuthReducer';

// combine reducers
export const appReducers = combineReducers({
  auth
});