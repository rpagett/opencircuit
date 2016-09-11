'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Success = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = exports.Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
  }

  _createClass(Index, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Need Help?'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Use this form to submit questions and feedback about the OpenCircuit service. If you have questions about circuit rules or procedures not related to this website, contact ',
          _react2.default.createElement(
            'a',
            { href: 'mailto:secretary@cwea.us' },
            'secretary@cwea.us'
          ),
          '.'
        ),
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'support',
            submitEndpoint: '/api/support',
            submitMethod: 'POST'
          },
          _react2.default.createElement(_components.FormInput, { name: 'subject', label: 'Subject' }),
          _react2.default.createElement(_components.TextArea, { name: 'details', label: 'Details of Problem/Question' }),
          _react2.default.createElement(
            'button',
            { role: 'submit', type: 'submit', name: 'submit', className: 'btn btn-success btn-block' },
            'Send'
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var Success = exports.Success = function (_React$Component2) {
  _inherits(Success, _React$Component2);

  function Success() {
    _classCallCheck(this, Success);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Success).apply(this, arguments));
  }

  _createClass(Success, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          { className: 'lead' },
          'Thank you!'
        ),
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          'p',
          null,
          'You should expect a response by email within 24 hours.'
        )
      );
    }
  }]);

  return Success;
}(_react2.default.Component);