'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Icon = require('../components/helpers/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _LoginForm = require('../forms/LoginForm');

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
        { className: 'card text-xs-center light-shadow' },
        _react2.default.createElement(
          'div',
          { className: 'card-header', style: { 'padding': '0rem' } },
          _react2.default.createElement('img', { className: 'card-img-top', src: '/assets/img/NavbarLogo.png' }),
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
          _react2.default.createElement(_LoginForm.LoginForm, null)
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
                ' Register Account'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12 col-sm-6 pull-xs-center' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/auth/recover', className: 'btn btn-link' },
                _react2.default.createElement(_Icon2.default, { shape: 'question' }),
                ' Forgot Password'
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);