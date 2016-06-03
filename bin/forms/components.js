'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidatedForm = exports.FormInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormInput = exports.FormInput = function (_React$Component) {
  _inherits(FormInput, _React$Component);

  function FormInput() {
    _classCallCheck(this, FormInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FormInput).call(this));

    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(FormInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        hasError: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'form-group row ' + (this.state.hasError ? 'has-danger' : '');

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { htmlFor: this.props.name, className: 'col-sm-4 form-control-label' },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-8' },
          _react2.default.createElement('input', _extends({
            type: this.props.inputType,
            name: this.props.name,
            className: 'form-control'
          }, this.props))
        )
      );
    }
  }]);

  return FormInput;
}(_react2.default.Component);

;

var ValidatedForm = exports.ValidatedForm = function (_React$Component2) {
  _inherits(ValidatedForm, _React$Component2);

  function ValidatedForm() {
    _classCallCheck(this, ValidatedForm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ValidatedForm).apply(this, arguments));
  }

  _createClass(ValidatedForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        this.props,
        this.props.children
      );
    }
  }]);

  return ValidatedForm;
}(_react2.default.Component);