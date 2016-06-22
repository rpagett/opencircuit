'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appReducers = undefined;

var _redux = require('redux');

var _AuthReducer = require('./models/Auth/AuthReducer');

var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// combine reducers
var appReducers = exports.appReducers = (0, _redux.combineReducers)({
  auth: _AuthReducer2.default
});

// import reducers