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

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _AppTemplate = require('./templates/AppTemplate');

var _AppTemplate2 = _interopRequireDefault(_AppTemplate);

var _AuthTemplate = require('./templates/AuthTemplate');

var _AuthTemplate2 = _interopRequireDefault(_AuthTemplate);

var _DashboardViews = require('./models/Dashboard/DashboardViews');

var RootView = _interopRequireWildcard(_DashboardViews);

var _AuthViews = require('./models/Auth/AuthViews');

var AuthView = _interopRequireWildcard(_AuthViews);

var _EventViews = require('./models/Event/EventViews');

var EventView = _interopRequireWildcard(_EventViews);

var _UnitViews = require('./models/Unit/UnitViews');

var UnitView = _interopRequireWildcard(_UnitViews);

var _UserViews = require('./models/User/UserViews');

var UserView = _interopRequireWildcard(_UserViews);

var _UserRoles = require('./models/User/UserRoles');

var _FlexTableActions = require('./helpers/FlexTable/FlexTableActions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getAppRoutes(store) {
  function authOnly(nextState, replace) {
    var authUser = store.getState().auth.user;

    (0, _FlexTableActions.dumpContents)();

    if (!authUser) {
      replace('/auth/login');
    }
  }

  function isUserOrAdmin(nextState, replace) {
    var authUser = store.getState().auth.user;
    var routeUser = nextState.params.email;

    if (!authUser) {
      replace('/');
    }

    if (routeUser != authUser.email && !authUser.roles.includes(_UserRoles.UserRoles.Administrator)) {
      replace('/');
    }
  }

  function requiresRole() {
    var role = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var nextState = arguments[1];
    var replace = arguments[2];

    var authUser = store.getState().auth.user;

    if (!authUser) {
      replace('/');
    }

    if (role && !authUser.roles.includes(_UserRoles.UserRoles.Administrator) && !authUser.roles.includes(role)) {
      replace('/');
    }
  }

  function guestOnly(nextState, replace) {
    var authUser = store.getState().auth.user;

    if (authUser) {
      replace('/');
    }
  }

  var AppRoutes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _AppTemplate2.default },
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _app2.default, onEnter: authOnly },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: RootView.Home }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/events' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: EventView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: 'new', component: EventView.New, onEnter: requiresRole.bind(this, _UserRoles.UserRoles.EventDirector) }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug', component: EventView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug/edit', component: EventView.Edit, onEnter: requiresRole.bind(this, _UserRoles.UserRoles.EventDirector) })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/units' },
        _react2.default.createElement(_reactRouter.Route, { path: 'register', component: UnitView.Register })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/users' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: UserView.Index, onEnter: requiresRole.bind(this, _UserRoles.UserRoles.Administrator) }),
        _react2.default.createElement(_reactRouter.Route, { path: ':email', component: UserView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':email/edit', component: UserView.Edit, onEnter: isUserOrAdmin })
      )
    ),
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/auth', component: _AuthTemplate2.default, onEnter: guestOnly },
      _react2.default.createElement(_reactRouter.Route, { path: 'login', component: AuthView.Login }),
      _react2.default.createElement(_reactRouter.Route, { path: 'register', component: AuthView.Register }),
      _react2.default.createElement(_reactRouter.Route, { path: 'forgot', component: AuthView.Forgot })
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