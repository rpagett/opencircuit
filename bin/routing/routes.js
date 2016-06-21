'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getAppRoutes = getAppRoutes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _AppTemplate = require('../templates/AppTemplate');

var _AppTemplate2 = _interopRequireDefault(_AppTemplate);

var _RootViews = require('../views/RootViews');

var RootView = _interopRequireWildcard(_RootViews);

var _AuthTemplate = require('../templates/AuthTemplate');

var _AuthTemplate2 = _interopRequireDefault(_AuthTemplate);

var _AuthViews = require('../views/AuthViews');

var AuthView = _interopRequireWildcard(_AuthViews);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getAppRoutes(store) {

  function authOnly(nextState, replaceState) {
    var authUser = store.getState().auth.user;

    if (!authUser) {
      replaceState(null, '/auth/login');
    }
  }

  function guestOnly(nextState, replaceState) {
    var authUser = store.getState().auth.user;

    if (authUser) {
      replaceState(null, '/');
    }
  }

  var AppRoutes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _AppTemplate2.default },
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _app2.default },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: RootView.Home }),
      _react2.default.createElement(_reactRouter.Route, { path: 'about', component: RootView.About })
    ),
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/auth', component: _AuthTemplate2.default },
      _react2.default.createElement(_reactRouter.Route, { path: 'login', component: AuthView.Login }),
      _react2.default.createElement(_reactRouter.Route, { path: 'register', component: AuthView.Register })
    )
  );

  return AppRoutes;
}

var AppRouter = exports.AppRouter = function (_React$Component) {
  _inherits(AppRouter, _React$Component);

  function AppRouter() {
    _classCallCheck(this, AppRouter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppRouter).apply(this, arguments));
  }

  _createClass(AppRouter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        getAppRoutes(this.props.reduxStore)
      );
    }
  }]);

  return AppRouter;
}(_react2.default.Component);

;