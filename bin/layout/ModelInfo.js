"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Val = exports.Prop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prop = exports.Prop = function (_React$Component) {
  _inherits(Prop, _React$Component);

  function Prop() {
    _classCallCheck(this, Prop);

    return _possibleConstructorReturn(this, (Prop.__proto__ || Object.getPrototypeOf(Prop)).apply(this, arguments));
  }

  _createClass(Prop, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "prop offset-xs-2 col-xs-12 offset-sm-0 col-sm-5 text-sm-right" },
        this.props.children
      );
    }
  }]);

  return Prop;
}(_react2.default.Component);

var Val = exports.Val = function (_React$Component2) {
  _inherits(Val, _React$Component2);

  function Val() {
    _classCallCheck(this, Val);

    return _possibleConstructorReturn(this, (Val.__proto__ || Object.getPrototypeOf(Val)).apply(this, arguments));
  }

  _createClass(Val, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "val offset-xs-4 col-xs-8 offset-sm-0 col-sm-7" },
        this.props.children
      );
    }
  }]);

  return Val;
}(_react2.default.Component);