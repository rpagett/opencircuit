'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _routes = require('./routes');

var _redux2 = require('./redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bootstrap for Browserify
global.$ = require('jquery');
global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

var preloadedState = window.__PRELOADED_STATE__;
var appStore = (0, _redux.createStore)(_redux2.appReducers, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: appStore },
  _react2.default.createElement(_routes.AppRouter, { reduxStore: appStore })
), document.getElementById('react-container'));

document.getElementById('injected-state').innerHTML = '';