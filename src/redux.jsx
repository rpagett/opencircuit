import { combineReducers, createStore } from 'redux';

// import reducers
import auth from './reducers/AuthReducer';

// combine reducers
export const appReducers = combineReducers({
  auth
});