'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

var _ComponentFlow = require('../../helpers/componentFlow/ComponentFlow');

var _ComponentFlow2 = _interopRequireDefault(_ComponentFlow);

var _RegistrationFlow = require('./RegistrationFlow');

var _RegistrationFlow2 = _interopRequireDefault(_RegistrationFlow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = exports.Register = function (_React$Component) {
  _inherits(Register, _React$Component);

  function Register() {
    _classCallCheck(this, Register);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Register).apply(this, arguments));
  }

  _createClass(Register, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'jumbotron' },
        _react2.default.createElement(
          'p',
          { className: 'display-3' },
          'Unit Registration'
        ),
        _react2.default.createElement(_ComponentFlow2.default, { flow: _RegistrationFlow2.default })
      );
    }
  }]);

  return Register;
}(_react2.default.Component);