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

var _CompClassViews = require('./models/CompClass/CompClassViews');

var CompClassView = _interopRequireWildcard(_CompClassViews);

var _FeeViews = require('./models/Fee/FeeViews');

var FeeView = _interopRequireWildcard(_FeeViews);

var _FormViews = require('./models/Form/FormViews');

var FormView = _interopRequireWildcard(_FormViews);

var _JudgeViews = require('./models/Judge/JudgeViews');

var JudgeView = _interopRequireWildcard(_JudgeViews);

var _EventViews = require('./models/Event/EventViews');

var EventView = _interopRequireWildcard(_EventViews);

var _OrganizationViews = require('./models/Organization/OrganizationViews');

var OrganizationView = _interopRequireWildcard(_OrganizationViews);

var _RegistrationViews = require('./models/Registration/RegistrationViews');

var RegistrationView = _interopRequireWildcard(_RegistrationViews);

var _ReportViews = require('./models/Report/ReportViews');

var ReportView = _interopRequireWildcard(_ReportViews);

var _SpielViews = require('./models/Spiel/SpielViews');

var SpielView = _interopRequireWildcard(_SpielViews);

var _SupportViews = require('./models/Support/SupportViews');

var SupportView = _interopRequireWildcard(_SupportViews);

var _UnitViews = require('./models/Unit/UnitViews');

var UnitView = _interopRequireWildcard(_UnitViews);

var _UnitTypeViews = require('./models/UnitType/UnitTypeViews');

var UnitTypeView = _interopRequireWildcard(_UnitTypeViews);

var _UserViews = require('./models/User/UserViews');

var UserView = _interopRequireWildcard(_UserViews);

var _UserRoles = require('./models/User/UserRoles');

var _FlexTableActions = require('./helpers/FlexTable/FlexTableActions');

var _ContentsViewActions = require('./helpers/ContentsView/ContentsViewActions');

var ContentsViewActions = _interopRequireWildcard(_ContentsViewActions);

var _ModelViewActions = require('./helpers/ModelView/ModelViewActions');

var ModelViewActions = _interopRequireWildcard(_ModelViewActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getAppRoutes(store) {
  var dumpAllContents = function dumpAllContents(store) {
    //store.dispatch(dumpFlexTable());
    store.dispatch(ModelViewActions.dumpContents());
    store.dispatch(ContentsViewActions.dumpContents());
  };

  function authOnly(nextState, replace) {
    var authUser = store.getState().auth.user;

    dumpAllContents(store);

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
    _react2.default.createElement(_reactRouter.Route, { path: '/invoice/:org', component: FeeView.Invoice }),
    _react2.default.createElement(_reactRouter.Route, { path: 'reports/drawstatus', component: ReportView.DrawStatus }),
    _react2.default.createElement(_reactRouter.Route, { path: 'reports/mailchimp', component: ReportView.MailChimp }),
    _react2.default.createElement(_reactRouter.Route, { path: 'reports/music', component: ReportView.Music }),
    _react2.default.createElement(_reactRouter.Route, { path: 'reports/quickbooks', component: ReportView.Quickbooks }),
    _react2.default.createElement(_reactRouter.Route, { path: 'reports/spiels', component: ReportView.Spiels }),
    _react2.default.createElement(_reactRouter.Route, { path: 'forms/verify/:unit/:form', component: FormView.Verify, onEnter: authOnly }),
    _react2.default.createElement(_reactRouter.Route, {
      path: 'forms/review/:unit/:form',
      component: FormView.Review,
      onEnter: requiresRole.bind(this, _UserRoles.UserRoles.Administrator)
    }),
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _app2.default, onEnter: authOnly },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: RootView.Home }),
      _react2.default.createElement(_reactRouter.Route, { path: '/404', component: RootView.PageNotFound }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/confirm' },
        _react2.default.createElement(_reactRouter.Route, { path: 'payment', component: RootView.ConfirmPayment })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/error' },
        _react2.default.createElement(_reactRouter.Route, { path: 'payment', component: RootView.ErrorPayment })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/compclasses', onEnter: requiresRole.bind(this, _UserRoles.UserRoles.Administrator) },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: CompClassView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: 'new', component: CompClassView.New }),
        _react2.default.createElement(_reactRouter.Route, { path: ':abbreviation', component: CompClassView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':abbreviation/edit', component: CompClassView.Edit })
      ),
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
        { path: '/fees', onEnter: requiresRole.bind(this, _UserRoles.UserRoles.Administrator) },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: FeeView.Index })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/forms', onEnter: requiresRole.bind(this, _UserRoles.UserRoles.FormsManager) },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: FormView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: 'review', component: FormView.ReviewList }),
        _react2.default.createElement(_reactRouter.Route, { path: ':form_id', component: FormView.View })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/judges', onEnter: requiresRole.bind(this, _UserRoles.UserRoles.JudgeManager) },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: JudgeView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: 'new', component: JudgeView.New }),
        _react2.default.createElement(_reactRouter.Route, { path: ':email', component: JudgeView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':email/edit', component: JudgeView.Edit })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/organizations' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: OrganizationView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug', component: OrganizationView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug/edit', component: OrganizationView.Edit })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/register' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: RegistrationView.DirectRegistration }),
        _react2.default.createElement(_reactRouter.Route, { path: 'new', component: RegistrationView.Organization }),
        _react2.default.createElement(_reactRouter.Route, { path: 'organization/:org', component: RegistrationView.Unit }),
        _react2.default.createElement(_reactRouter.Route, { path: 'unit/:unit', component: RegistrationView.Details }),
        _react2.default.createElement(_reactRouter.Route, { path: 'unit/:unit/events', component: RegistrationView.EventRegistration }),
        _react2.default.createElement(_reactRouter.Route, { path: 'unit/:unit/confirm', component: RegistrationView.Confirm })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/reports', onEnter: requiresRole.bind(this, _UserRoles.UserRoles.Administrator) },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: ReportView.Index })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/spiels' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: SpielView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug', component: SpielView.Edit })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/support' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: SupportView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: 'success', component: SupportView.Success })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/units' },
        _react2.default.createElement(_reactRouter.IndexRoute, {
          component: UnitView.Index,
          onEnter: requiresRole.bind(this, _UserRoles.UserRoles.EventDirector)
        }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug', component: UnitView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug/edit', component: UnitView.Edit })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/unittypes', onEnter: requiresRole.bind(this, _UserRoles.UserRoles.Administrator) },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: UnitTypeView.Index }),
        _react2.default.createElement(_reactRouter.Route, { path: 'new', component: UnitTypeView.New }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug', component: UnitTypeView.Show }),
        _react2.default.createElement(_reactRouter.Route, { path: ':slug/edit', component: UnitTypeView.Edit })
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
      _react2.default.createElement(_reactRouter.Route, { path: 'recover', component: AuthView.Recover }),
      _react2.default.createElement(_reactRouter.Route, { path: 'recover/:token', component: AuthView.ProcessRecovery }),
      _react2.default.createElement(_reactRouter.Route, { path: 'sent-recovery', component: AuthView.PostRecovery }),
      _react2.default.createElement(_reactRouter.Route, { path: 'must-confirm', component: AuthView.MustConfirm }),
      _react2.default.createElement(_reactRouter.Route, { path: 'confirm', component: AuthView.PostRegister })
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