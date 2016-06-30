import { combineReducers } from 'redux';

// import reducers
import auth from './models/Auth/AuthReducer';
import flexTable from './flexTable/FlexTableReducer';
import form from './forms/FormReducer';
import modal from './modals/ModalReducer';
import users from './models/User/UserReducer';

// combine reducers
export const appReducers = combineReducers({
  auth,
  flexTable,
  form,
  modal,
  users
});