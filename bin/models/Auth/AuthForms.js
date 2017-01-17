'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessPasswordRecovery = exports.PasswordRecovery = exports.LoginForm = exports.RegistrationForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegistrationForm = exports.RegistrationForm = function (_React$Component) {
  _inherits(RegistrationForm, _React$Component);

  function RegistrationForm() {
    _classCallCheck(this, RegistrationForm);

    return _possibleConstructorReturn(this, (RegistrationForm.__proto__ || Object.getPrototypeOf(RegistrationForm)).apply(this, arguments));
  }

  _createClass(RegistrationForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'auth_register',
          submitEndpoint: '/auth/register',
          submitMethod: 'POST'
        },
        _react2.default.createElement(_components.FormInput, { type: 'email', name: 'email', label: 'Email' }),
        _react2.default.createElement(_components.FormInput, { type: 'password', name: 'password', label: 'Password' }),
        _react2.default.createElement(_components.FormInput, { type: 'password', name: 'password_verify', label: 'Verify Password' }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_components.FormInput, { name: 'first_name', label: 'First Name' }),
        _react2.default.createElement(_components.FormInput, { name: 'mi', label: 'Middle Initial' }),
        _react2.default.createElement(_components.FormInput, { name: 'last_name', label: 'Last Name' }),
        _react2.default.createElement(_components.PhoneInput, { name: 'phone', label: 'Phone' }),
        _react2.default.createElement(_components.FormInput, { name: 'street', label: 'Street' }),
        _react2.default.createElement(_components.FormInput, { name: 'address_2', label: 'Address 2' }),
        _react2.default.createElement(_components.FormInput, { name: 'city', label: 'City' }),
        _react2.default.createElement(_components.StateSelect, { name: 'state', label: 'State' }),
        _react2.default.createElement(_components.FormInput, { name: 'zip', label: 'ZIP', maxLength: '5' }),
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-success btn-block' },
          'Register'
        )
      );
    }
  }]);

  return RegistrationForm;
}(_react2.default.Component);

var LoginForm = exports.LoginForm = function (_React$Component2) {
  _inherits(LoginForm, _React$Component2);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    return _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).apply(this, arguments));
  }

  _createClass(LoginForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'auth_login',
          submitEndpoint: '/auth/login',
          submitMethod: 'POST'
        },
        _react2.default.createElement(_components.FormInput, { type: 'email', name: 'email', label: 'Email' }),
        _react2.default.createElement(_components.FormInput, { type: 'password', name: 'password', label: 'Password' }),
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-success btn-block' },
          'Log In'
        )
      );
    }
  }]);

  return LoginForm;
}(_react2.default.Component);

var PasswordRecovery = exports.PasswordRecovery = function (_React$Component3) {
  _inherits(PasswordRecovery, _React$Component3);

  function PasswordRecovery() {
    _classCallCheck(this, PasswordRecovery);

    return _possibleConstructorReturn(this, (PasswordRecovery.__proto__ || Object.getPrototypeOf(PasswordRecovery)).apply(this, arguments));
  }

  _createClass(PasswordRecovery, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'auth_recover',
          submitEndpoint: '/auth/recover',
          submitMethod: 'POST'
        },
        _react2.default.createElement(_components.FormInput, { type: 'email', name: 'email', label: 'Email' }),
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-success btn-block' },
          'Send Recovery Code'
        )
      );
    }
  }]);

  return PasswordRecovery;
}(_react2.default.Component);

var ProcessPasswordRecovery = exports.ProcessPasswordRecovery = function (_React$Component4) {
  _inherits(ProcessPasswordRecovery, _React$Component4);

  function ProcessPasswordRecovery() {
    _classCallCheck(this, ProcessPasswordRecovery);

    return _possibleConstructorReturn(this, (ProcessPasswordRecovery.__proto__ || Object.getPrototypeOf(ProcessPasswordRecovery)).apply(this, arguments));
  }

  _createClass(ProcessPasswordRecovery, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'auth_process_recover',
          submitEndpoint: '/auth/recover/' + this.props.token,
          submitMethod: 'POST'
        },
        _react2.default.createElement(_components.FormInput, { type: 'password', name: 'password', label: 'New Password' }),
        _react2.default.createElement(_components.FormInput, { type: 'password', name: 'password_verify', label: 'Verify Password' }),
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-success btn-block' },
          'Set Password'
        )
      );
    }
  }]);

  return ProcessPasswordRecovery;
}(_react2.default.Component);