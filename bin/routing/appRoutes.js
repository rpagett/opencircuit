'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _home = require('../views/root/home');

var _home2 = _interopRequireDefault(_home);

var _about = require('../views/root/about');

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppRoutes = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _app2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _about2.default })
);

exports.default = AppRoutes;