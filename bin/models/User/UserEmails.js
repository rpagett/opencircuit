'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.testEmail = testEmail;
exports.confirmationEmail = confirmationEmail;
exports.recoveryEmail = recoveryEmail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TestEmail = function (_React$Component) {
  _inherits(_TestEmail, _React$Component);

  function _TestEmail() {
    _classCallCheck(this, _TestEmail);

    return _possibleConstructorReturn(this, (_TestEmail.__proto__ || Object.getPrototypeOf(_TestEmail)).apply(this, arguments));
  }

  _createClass(_TestEmail, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'This is a test email.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'If you feel you have received this message in error, you may ',
          _react2.default.createElement(
            'a',
            { href: '%unsubscribe_url%' },
            'unsubscribe'
          ),
          ' from any future communication.'
        )
      );
    }
  }]);

  return _TestEmail;
}(_react2.default.Component);

var _ConfirmationEmail = function (_React$Component2) {
  _inherits(_ConfirmationEmail, _React$Component2);

  function _ConfirmationEmail() {
    _classCallCheck(this, _ConfirmationEmail);

    return _possibleConstructorReturn(this, (_ConfirmationEmail.__proto__ || Object.getPrototypeOf(_ConfirmationEmail)).apply(this, arguments));
  }

  _createClass(_ConfirmationEmail, [{
    key: 'render',
    value: function render() {
      var user = this.props.user;
      var url = process.env.BASE_URL + ('/auth/confirm/' + user.confirmation_token);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Dear ',
          user.first_name,
          ','
        ),
        _react2.default.createElement(
          'p',
          null,
          'Thank you for your registration with OpenCircuit. You must click the link below to complete the process and activate your user account.'
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { href: url },
            'Click here to complete your registration.'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'If the link does not work, copy and paste ',
          url,
          ' into your browser\'s address bar.'
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'p',
          null,
          'If you feel you have received this message in error, you may ',
          _react2.default.createElement(
            'a',
            { href: '%unsubscribe_url%' },
            'unsubscribe'
          ),
          ' from any future communication.'
        )
      );
    }
  }]);

  return _ConfirmationEmail;
}(_react2.default.Component);

function testEmail() {
  return (0, _server.renderToString)(_react2.default.createElement(_TestEmail, null));
}

function confirmationEmail(user) {
  return (0, _server.renderToString)(_react2.default.createElement(_ConfirmationEmail, { user: user }));
}

var _RecoveryEmail = function (_React$Component3) {
  _inherits(_RecoveryEmail, _React$Component3);

  function _RecoveryEmail() {
    _classCallCheck(this, _RecoveryEmail);

    return _possibleConstructorReturn(this, (_RecoveryEmail.__proto__ || Object.getPrototypeOf(_RecoveryEmail)).apply(this, arguments));
  }

  _createClass(_RecoveryEmail, [{
    key: 'render',
    value: function render() {
      var user = this.props.user;

      var url = process.env.BASE_URL + ('/auth/recover/' + user.recovery_token);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Dear ',
          user.first_name,
          ','
        ),
        _react2.default.createElement(
          'p',
          null,
          'You recently requested a password reset from OpenCircuit.us'
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { href: url },
            'Click here to set a new password.'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'If the link does not work, copy and paste ',
          url,
          ' into your browser\'s address bar.'
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'p',
          null,
          'If you did not request a password reset, you may ignore this email. If you feel you have received this message in error, you may ',
          _react2.default.createElement(
            'a',
            { href: '%unsubscribe_url%' },
            'unsubscribe'
          ),
          ' from any future communication.'
        )
      );
    }
  }]);

  return _RecoveryEmail;
}(_react2.default.Component);

function recoveryEmail(user) {
  return (0, _server.renderToString)(_react2.default.createElement(_RecoveryEmail, { user: user }));
}