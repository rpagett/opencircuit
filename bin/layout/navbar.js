'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _Icon = require('../helpers/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _UserRoles = require('../models/User/UserRoles');

var _gravatars = require('../helpers/gravatars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserDropdown = function (_React$Component) {
  _inherits(UserDropdown, _React$Component);

  function UserDropdown() {
    _classCallCheck(this, UserDropdown);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserDropdown).apply(this, arguments));
  }

  _createClass(UserDropdown, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'nav-item right dropdown user-dropdown' },
        _react2.default.createElement(
          'a',
          { className: 'nav-link dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
          _react2.default.createElement(_gravatars.MiniGravatar, { email: this.props.user.email }),
          '  ' + this.props.user.formattedName
        ),
        _react2.default.createElement(
          'div',
          { className: 'dropdown-menu' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: this.props.user.profileUrl, className: 'dropdown-item' },
            'View Profile'
          ),
          _react2.default.createElement('div', { className: 'dropdown-divider' }),
          _react2.default.createElement(
            'a',
            { className: 'dropdown-item', href: '/auth/logout' },
            'Log Out'
          )
        )
      );
    }
  }]);

  return UserDropdown;
}(_react2.default.Component);

var _NavBar = function (_React$Component2) {
  _inherits(_NavBar, _React$Component2);

  function _NavBar() {
    _classCallCheck(this, _NavBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_NavBar).apply(this, arguments));
  }

  _createClass(_NavBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { className: 'navbar-fixed-top navbar-full navbar-light bg-nav light-shadow', role: 'navigation' },
        _react2.default.createElement(
          'button',
          { className: 'navbar-toggler hidden-sm-up pull-xs-right', type: 'button', 'data-toggle': 'collapse', 'data-target': '#collapsingNav' },
          _react2.default.createElement(_Icon2.default, { shape: 'bars' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'collapse navbar-toggleable-xs navPadding', id: 'collapsingNav' },
          _react2.default.createElement(
            'div',
            { className: 'nav navbar-nav flex-nav' },
            _react2.default.createElement(
              'div',
              { className: 'nav-item' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                _react2.default.createElement('img', { src: '/assets/img/2016NavbarLogo.png', alt: 'OpenCircuit', className: 'nav-logo', 'aria-hidden': 'true' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'nav-item' },
              _react2.default.createElement(
                _reactRouter.IndexLink,
                { to: '/', className: 'nav-link', activeClassName: 'active' },
                _react2.default.createElement(_Icon2.default, { shape: 'home' }),
                ' Dashboard'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'nav-item' },
              _react2.default.createElement(
                _reactRouter.IndexLink,
                { to: '/events', className: 'nav-link', activeClassName: 'active' },
                _react2.default.createElement(_Icon2.default, { shape: 'trophy' }),
                ' Events'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'nav-item' },
              _react2.default.createElement(
                _reactRouter.IndexLink,
                { to: '/support', className: 'nav-link', activeClassName: 'active' },
                _react2.default.createElement(_Icon2.default, { shape: 'question-circle-o' }),
                ' Support'
              )
            ),
            _react2.default.createElement(
              _UserRoles.HasRole,
              { role: _UserRoles.UserRoles.Administrator, className: 'nav-item dropdown' },
              _react2.default.createElement(
                'a',
                { className: 'nav-link dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                _react2.default.createElement(_Icon2.default, { shape: 'cog' }),
                ' Manage'
              ),
              _react2.default.createElement(
                'div',
                { className: 'dropdown-menu' },
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/compclasses', className: 'dropdown-item' },
                  'Classes'
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/fees', className: 'dropdown-item' },
                  'Fees'
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/organizations', className: 'dropdown-item' },
                  'Organizations'
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/units', className: 'dropdown-item' },
                  'Units'
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/unittypes', className: 'dropdown-item' },
                  'Unit Types'
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/users', className: 'dropdown-item' },
                  'Users'
                )
              )
            ),
            _react2.default.createElement(UserDropdown, { user: this.props.user })
          )
        )
      );
    }
  }]);

  return _NavBar;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

var NavBar = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_NavBar);
exports.default = NavBar;