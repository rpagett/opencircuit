'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostRecovery = exports.PostRegister = exports.MustConfirm = exports.ProcessRecovery = exports.Recover = exports.Register = exports.Login = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Icon = require('../../helpers/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _AuthForms = require('./AuthForms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = exports.Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Login).apply(this, arguments));
  }

  _createClass(Login, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'vcenter-parent col-xs-12 offset-md-2 col-md-8' },
        _react2.default.createElement(
          'div',
          { className: 'card text-xs-center light-shadow' },
          _react2.default.createElement(
            'div',
            { className: 'card-header', style: { 'padding': '0rem' } },
            _react2.default.createElement('img', { className: 'card-img-top', src: '/assets/img/2016NavbarLogo.png' }),
            _react2.default.createElement(
              'div',
              { className: 'container-fluid card-info card-inverse auth-card' },
              _react2.default.createElement(
                'strong',
                { className: 'h5' },
                'Log In'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-block' },
            _react2.default.createElement(
              'div',
              { className: 'alert alert-warning' },
              'If this is your first time logging into the new OpenCircuit, good news! Your account is still around. Unfortunately, you\'ll need to reset your password. Click ',
              _react2.default.createElement(
                'strong',
                null,
                'Recover Password'
              ),
              ' below to proceed.'
            ),
            _react2.default.createElement(_AuthForms.LoginForm, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-footer' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-sm-6 pull-xs-center' },
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/auth/register', className: 'btn btn-link' },
                  _react2.default.createElement(_Icon2.default, { shape: 'plus' }),
                  'Register Account'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-sm-6 pull-xs-center' },
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/auth/recover', className: 'btn btn-link' },
                  _react2.default.createElement(_Icon2.default, { shape: 'question' }),
                  'Recover Password'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

var Register = exports.Register = function (_React$Component2) {
  _inherits(Register, _React$Component2);

  function Register() {
    _classCallCheck(this, Register);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Register).apply(this, arguments));
  }

  _createClass(Register, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'vcenter-parent registration-box col-xs-12 offset-md-2 col-md-8' },
        _react2.default.createElement(
          'div',
          { className: 'card text-xs-center light-shadow' },
          _react2.default.createElement(
            'div',
            { className: 'card-header', style: { 'padding': '0rem' } },
            _react2.default.createElement('img', { className: 'card-img-top', src: '/assets/img/2016NavbarLogo.png' }),
            _react2.default.createElement(
              'div',
              { className: 'container-fluid card-info card-inverse auth-card' },
              _react2.default.createElement(
                'strong',
                { className: 'h5' },
                'Register an Account'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-block' },
            _react2.default.createElement(_AuthForms.RegistrationForm, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-footer' },
            _react2.default.createElement(
              'center',
              null,
              'Already have an account? ',
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/auth/login', className: 'btn btn-link' },
                'Log In.'
              )
            )
          )
        )
      );
    }
  }]);

  return Register;
}(_react2.default.Component);

var Recover = exports.Recover = function (_React$Component3) {
  _inherits(Recover, _React$Component3);

  function Recover() {
    _classCallCheck(this, Recover);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Recover).apply(this, arguments));
  }

  _createClass(Recover, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'vcenter-parent registration-box col-xs-12 offset-md-2 col-md-8' },
        _react2.default.createElement(
          'div',
          { className: 'card text-xs-center light-shadow' },
          _react2.default.createElement(
            'div',
            { className: 'card-header', style: { 'padding': '0rem' } },
            _react2.default.createElement('img', { className: 'card-img-top', src: '/assets/img/2016NavbarLogo.png' }),
            _react2.default.createElement(
              'div',
              { className: 'container-fluid card-info card-inverse auth-card' },
              _react2.default.createElement(
                'strong',
                { className: 'h5' },
                'Recover Password'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-block' },
            _react2.default.createElement(_AuthForms.PasswordRecovery, null)
          )
        )
      );
    }
  }]);

  return Recover;
}(_react2.default.Component);

var ProcessRecovery = exports.ProcessRecovery = function (_React$Component4) {
  _inherits(ProcessRecovery, _React$Component4);

  function ProcessRecovery() {
    _classCallCheck(this, ProcessRecovery);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProcessRecovery).apply(this, arguments));
  }

  _createClass(ProcessRecovery, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'vcenter-parent registration-box col-xs-12 offset-md-2 col-md-8' },
        _react2.default.createElement(
          'div',
          { className: 'card text-xs-center light-shadow' },
          _react2.default.createElement(
            'div',
            { className: 'card-header', style: { 'padding': '0rem' } },
            _react2.default.createElement('img', { className: 'card-img-top', src: '/assets/img/2016NavbarLogo.png' }),
            _react2.default.createElement(
              'div',
              { className: 'container-fluid card-info card-inverse auth-card' },
              _react2.default.createElement(
                'strong',
                { className: 'h5' },
                'Recover Password'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-block' },
            _react2.default.createElement(_AuthForms.ProcessPasswordRecovery, { token: this.props.params.token })
          )
        )
      );
    }
  }]);

  return ProcessRecovery;
}(_react2.default.Component);

var MustConfirm = exports.MustConfirm = function (_React$Component5) {
  _inherits(MustConfirm, _React$Component5);

  function MustConfirm() {
    _classCallCheck(this, MustConfirm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MustConfirm).apply(this, arguments));
  }

  _createClass(MustConfirm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'offset-xs-1 col-xs-10' },
        _react2.default.createElement(
          'div',
          { className: 'content-container' },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'You have not yet confirmed your membership.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Check your email for a confirmation link.'
          )
        )
      );
    }
  }]);

  return MustConfirm;
}(_react2.default.Component);

var PostRegister = exports.PostRegister = function (_React$Component6) {
  _inherits(PostRegister, _React$Component6);

  function PostRegister() {
    _classCallCheck(this, PostRegister);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PostRegister).apply(this, arguments));
  }

  _createClass(PostRegister, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'offset-xs-1 col-xs-10' },
        _react2.default.createElement(
          'div',
          { className: 'content-container' },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'Your registration is processing.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Check your email for a link to confirm your new membership.'
          )
        )
      );
    }
  }]);

  return PostRegister;
}(_react2.default.Component);

var PostRecovery = exports.PostRecovery = function (_React$Component7) {
  _inherits(PostRecovery, _React$Component7);

  function PostRecovery() {
    _classCallCheck(this, PostRecovery);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PostRecovery).apply(this, arguments));
  }

  _createClass(PostRecovery, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'offset-xs-1 col-xs-10' },
        _react2.default.createElement(
          'div',
          { className: 'content-container' },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'Check your email!'
          ),
          _react2.default.createElement(
            'p',
            null,
            'There will be instructions there to process your password recovery.'
          )
        )
      );
    }
  }]);

  return PostRecovery;
}(_react2.default.Component);