'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidatedForm = exports.FormInput = exports.FormError = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _dec, _class2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var FormError = exports.FormError = (_temp = _class = function (_React$Component) {
  _inherits(FormError, _React$Component);

  function FormError() {
    _classCallCheck(this, FormError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormError).apply(this, arguments));
  }

  _createClass(FormError, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          ReactCSSTransitionGroup,
          {
            transitionName: 'validationerror',
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300,
            transitionAppear: true,
            transitionAppearTimeout: 30
          },
          _react2.default.createElement(
            'div',
            { key: 'errorMessage', className: 'form-validation-error' },
            this.props.children
          )
        )
      );
    }
  }]);

  return FormError;
}(_react2.default.Component), _class.propTypes = {
  message: _react2.default.PropTypes.string
}, _temp);
var FormInput = exports.FormInput = (_dec = (0, _formsyReact.Decorator)(), _dec(_class2 = function (_React$Component2) {
  _inherits(FormInput, _React$Component2);

  function FormInput() {
    _classCallCheck(this, FormInput);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(FormInput).call(this));

    _this2.state = {
      hasError: false
    };
    return _this2;
  }

  _createClass(FormInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        hasError: false
      });
    }
  }, {
    key: 'changeValue',
    value: function changeValue(e) {
      this.props.setValue(e.currentTarget.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'form-group row ' + (this.props.showError() ? 'has-danger' : '');
      var errorMessage = this.props.getErrorMessage();

      var validation = {};
      if (this.props.validationHook == 'change') {
        validation['onChange'] = this.changeValue.bind(this);
      } else {
        validation['onBlur'] = this.changeValue.bind(this);
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { htmlFor: this.props.name, className: 'col-xs-12 col-sm-4 form-control-label' },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-12 col-sm-8' },
          _react2.default.createElement('input', _extends({
            type: this.props.inputType,
            name: this.props.name,
            className: 'form-control',
            defaultValue: this.props.getValue()
          }, validation, this.props)),
          _react2.default.createElement(
            FormError,
            null,
            errorMessage
          )
        )
      );
    }
  }]);

  return FormInput;
}(_react2.default.Component)) || _class2);
;

var ValidatedForm = exports.ValidatedForm = function (_React$Component3) {
  _inherits(ValidatedForm, _React$Component3);

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