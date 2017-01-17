"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingCube = (_temp = _class = function (_React$Component) {
  _inherits(LoadingCube, _React$Component);

  function LoadingCube() {
    _classCallCheck(this, LoadingCube);

    return _possibleConstructorReturn(this, (LoadingCube.__proto__ || Object.getPrototypeOf(LoadingCube)).apply(this, arguments));
  }

  _createClass(LoadingCube, [{
    key: "render",
    value: function render() {
      if (this.props.show) {
        return _react2.default.createElement(
          "div",
          { className: "sk-folding-cube" },
          _react2.default.createElement("div", { className: "sk-cube1 sk-cube" }),
          _react2.default.createElement("div", { className: "sk-cube2 sk-cube" }),
          _react2.default.createElement("div", { className: "sk-cube4 sk-cube" }),
          _react2.default.createElement("div", { className: "sk-cube3 sk-cube" })
        );
      }

      return '';
    }
  }]);

  return LoadingCube;
}(_react2.default.Component), _class.propTypes = {
  show: _react2.default.PropTypes.bool.isRequired
}, _temp);
exports.default = LoadingCube;
module.exports = exports["default"];