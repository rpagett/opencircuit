"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppShell = function (_React$Component) {
  _inherits(AppShell, _React$Component);

  function AppShell() {
    _classCallCheck(this, AppShell);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppShell).apply(this, arguments));
  }

  _createClass(AppShell, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "html",
        null,
        _react2.default.createElement(
          "head",
          null,
          _react2.default.createElement("meta", { charSet: "UTF-8" }),
          _react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }),
          _react2.default.createElement(
            "title",
            null,
            "OpenCircuit"
          ),
          _react2.default.createElement("link", { rel: "stylesheet", href: "/css/app.min.css" })
        ),
        _react2.default.createElement(
          "body",
          null,
          this.props.children,
          _react2.default.createElement("script", { type: "text/javascript", src: "/js/vendor.js" }),
          _react2.default.createElement("script", { type: "text/javascript", src: "/js/bundle.js" }),
          _react2.default.createElement("script", { type: "text/javascript", src: "/js/bootstrap.js" })
        )
      );
    }
  }]);

  return AppShell;
}(_react2.default.Component);

;

exports.default = AppShell;