'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDeletion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmDeletion = exports.ConfirmDeletion = function (_React$Component) {
  _inherits(ConfirmDeletion, _React$Component);

  function ConfirmDeletion() {
    _classCallCheck(this, ConfirmDeletion);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmDeletion).apply(this, arguments));
  }

  _createClass(ConfirmDeletion, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'CONFIRM_DELETION',
          submitEndpoint: this.props.endpoint,
          submitMethod: 'DELETE',
          inModal: true
        },
        _react2.default.createElement(
          'p',
          { className: 'lead' },
          'Are you sure you want to delete ',
          this.props.name,
          '?'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 col-sm-6' },
            _react2.default.createElement(
              'button',
              { role: 'cancel', className: 'btn btn-danger btn-block' },
              'No!'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 col-sm-6' },
            _react2.default.createElement(
              'button',
              { role: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
              'Yes, Delete It'
            )
          )
        )
      );
    }
  }]);

  return ConfirmDeletion;
}(_react2.default.Component);