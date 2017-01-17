'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = exports.Edit = function (_React$Component) {
  _inherits(Edit, _React$Component);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'user_edit',
          fetchEndpoint: '/api/users/' + this.props.email,
          submitEndpoint: '/api/users/' + this.props.email,
          submitMethod: 'PATCH'
        },
        _react2.default.createElement(_components.FormStatic, { name: 'email', label: 'Email' }),
        _react2.default.createElement(_components.FormInput, { name: 'first_name', label: 'First Name' }),
        _react2.default.createElement(_components.FormInput, { name: 'mi', label: 'Middle Initial' }),
        _react2.default.createElement(_components.FormInput, { name: 'last_name', label: 'Last Name' }),
        _react2.default.createElement(_components.PhoneInput, { name: 'phone', label: 'Phone' }),
        _react2.default.createElement(_components.FormInput, { name: 'street', label: 'Street' }),
        _react2.default.createElement(_components.FormInput, { name: 'address_2', label: 'Address 2' }),
        _react2.default.createElement(_components.FormInput, { name: 'city', label: 'City' }),
        _react2.default.createElement(_components.StateSelect, { name: 'state', label: 'State' }),
        _react2.default.createElement(_components.FormInput, { name: 'zip', label: 'ZIP' }),
        _react2.default.createElement(
          'button',
          { name: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
          'Save Changes'
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);