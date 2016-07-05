'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = exports.Home = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _UserRoles = require('../User/UserRoles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Home = function (_React$Component) {
  _inherits(_Home, _React$Component);

  function _Home() {
    _classCallCheck(this, _Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Home).apply(this, arguments));
  }

  _createClass(_Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'alert alert-success' },
          this.props.userToken ? 'You\'re logged in!' : 'Everything is wonderful!',
          _react2.default.createElement(
            'span',
            { className: 'pull-right' },
            _react2.default.createElement(
              'strong',
              null,
              this.props.user ? this.props.user.email : 'Seriously!'
            )
          )
        ),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.Administrator },
          _react2.default.createElement(
            'div',
            { className: 'alert alert-warning' },
            'You have the right privileges.'
          )
        )
      );
    }
  }]);

  return _Home;
}(_react2.default.Component);

var mapStateToHomeProps = function mapStateToHomeProps(state, ownProps) {
  return {
    userToken: state.auth.token,
    user: state.auth.user
  };
};

var mapDispatchToHomeProps = function mapDispatchToHomeProps(dispatch) {
  return {};
};

var Home = exports.Home = (0, _reactRedux.connect)(mapStateToHomeProps, mapDispatchToHomeProps)(_Home);

var About = exports.About = function (_React$Component2) {
  _inherits(About, _React$Component2);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
  }

  _createClass(About, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { 'class': 'h4' },
          'About Stuff'
        )
      );
    }
  }]);

  return About;
}(_react2.default.Component);