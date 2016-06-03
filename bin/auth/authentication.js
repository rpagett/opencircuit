'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationFlow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _appContent = require('../layout/appContent');

var _appContent2 = _interopRequireDefault(_appContent);

var _bodyContent = require('../layout/bodyContent');

var _bodyContent2 = _interopRequireDefault(_bodyContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationFlow = exports.AuthenticationFlow = function (_React$Component) {
  _inherits(AuthenticationFlow, _React$Component);

  function AuthenticationFlow() {
    _classCallCheck(this, AuthenticationFlow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AuthenticationFlow).apply(this, arguments));
  }

  _createClass(AuthenticationFlow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _appContent2.default,
        null,
        _react2.default.createElement(
          _bodyContent2.default,
          null,
          'Auth Stuff!',
          this.props.children
        )
      );
    }
  }]);

  return AuthenticationFlow;
}(_react2.default.Component);

;