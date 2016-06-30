'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appReducers = undefined;

var _redux = require('redux');

var _AuthReducer = require('./models/Auth/AuthReducer');

var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

var _FlexTableReducer = require('./flexTable/FlexTableReducer');

var _FlexTableReducer2 = _interopRequireDefault(_FlexTableReducer);

var _FormReducer = require('./forms/FormReducer');

var _FormReducer2 = _interopRequireDefault(_FormReducer);

var _ModalReducer = require('./modals/ModalReducer');

var _ModalReducer2 = _interopRequireDefault(_ModalReducer);

var _UserReducer = require('./models/User/UserReducer');

var _UserReducer2 = _interopRequireDefault(_UserReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// combine reducers
var appReducers = exports.appReducers = (0, _redux.combineReducers)({
  auth: _AuthReducer2.default,
  flexTable: _FlexTableReducer2.default,
  form: _FormReducer2.default,
  modal: _ModalReducer2.default,
  users: _UserReducer2.default
});

// import reducers