'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationTemplate = function (_React$Component) {
  _inherits(AuthenticationTemplate, _React$Component);

  function AuthenticationTemplate() {
    _classCallCheck(this, AuthenticationTemplate);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AuthenticationTemplate).apply(this, arguments));
  }

  _createClass(AuthenticationTemplate, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('html', null);
    }
  }]);

  return AuthenticationTemplate;
}(_react2.default.Component);

;

var AuthenticationRouter = function (_React$Component2) {
  _inherits(AuthenticationRouter, _React$Component2);

  function AuthenticationRouter() {
    _classCallCheck(this, AuthenticationRouter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AuthenticationRouter).apply(this, arguments));
  }

  _createClass(AuthenticationRouter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _react2.default.createElement(
          Route,
          { path: '/auth', component: AuthenticationTemplate },
          _react2.default.createElement(Route, { path: '/login', component: AuthView.Login })
        )
      );
    }
  }]);

  return AuthenticationRouter;
}(_react2.default.Component);

;