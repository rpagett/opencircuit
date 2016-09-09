'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appReducers = undefined;

var _redux = require('redux');

var _AuthReducer = require('./models/Auth/AuthReducer');

var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

var _ComponentFlowReducer = require('./helpers/ComponentFlow/ComponentFlowReducer');

var _ComponentFlowReducer2 = _interopRequireDefault(_ComponentFlowReducer);

var _ContentsViewReducer = require('./helpers/ContentsView/ContentsViewReducer');

var _ContentsViewReducer2 = _interopRequireDefault(_ContentsViewReducer);

var _FlexTableReducer = require('./helpers/FlexTable/FlexTableReducer');

var _FlexTableReducer2 = _interopRequireDefault(_FlexTableReducer);

var _FormReducer = require('./forms/FormReducer');

var _FormReducer2 = _interopRequireDefault(_FormReducer);

var _ModalReducer = require('./modals/ModalReducer');

var _ModalReducer2 = _interopRequireDefault(_ModalReducer);

var _ModelViewReducer = require('./helpers/ModelView/ModelViewReducer');

var _ModelViewReducer2 = _interopRequireDefault(_ModelViewReducer);

var _UserReducer = require('./models/User/UserReducer');

var _UserReducer2 = _interopRequireDefault(_UserReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// combine reducers


// import reducers
var appReducers = exports.appReducers = (0, _redux.combineReducers)({
  auth: _AuthReducer2.default,
  componentFlow: _ComponentFlowReducer2.default,
  contentsView: _ContentsViewReducer2.default,
  flexTable: _FlexTableReducer2.default,
  form: _FormReducer2.default,
  modal: _ModalReducer2.default,
  modelView: _ModelViewReducer2.default,
  users: _UserReducer2.default
});