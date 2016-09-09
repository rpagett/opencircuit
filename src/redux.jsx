import { combineReducers } from 'redux';

// import reducers
import auth from './models/Auth/AuthReducer';
import componentFlow from './helpers/componentFlow/ComponentFlowReducer';
import contentsView from './helpers/ContentsView/ContentsViewReducer';
import flexTable from './helpers/FlexTable/FlexTableReducer';
import form from './forms/FormReducer';
import modal from './modals/ModalReducer';
import modelView from './helpers/modelView/ModelViewReducer';
import users from './models/User/UserReducer';

// combine reducers
export const appReducers = combineReducers({
  auth,
  componentFlow,
  contentsView,
  flexTable,
  form,
  modal,
  modelView,
  users
});