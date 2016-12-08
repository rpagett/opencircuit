'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _components = require('../../forms/components');

var _UserRoles = require('../User/UserRoles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = exports.Edit = function (_React$Component) {
  _inherits(Edit, _React$Component);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Edit).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'render',
    value: function render() {
      var fetch = {};

      fetch.submitEndpoint = '/api/spiels/' + this.props.slug;
      fetch.fetchEndpoint = '/api/spiels/' + this.props.slug;
      fetch.submitMethod = 'PATCH';

      return _react2.default.createElement(
        _components.ReduxForm,
        _extends({
          subStore: 'spiel_edit'
        }, fetch),
        _react2.default.createElement(_components.FormStatic, { name: 'name', label: 'Name' }),
        _react2.default.createElement(_components.FormStatic, { name: 'city', label: 'City' }),
        _react2.default.createElement(_components.FormStatic, { name: 'state', label: 'State' }),
        _react2.default.createElement(_components.FormInput, { name: 'unit_name', label: 'Custom Unit Name' }),
        _react2.default.createElement(_components.FormInput, { name: 'show_title', label: 'Show Title' }),
        _react2.default.createElement(_components.FormInput, { name: 'directors', label: 'Directors' }),
        _react2.default.createElement(_components.FormInput, { name: 'age_outs', label: 'Age Outs and Graduates' }),
        _react2.default.createElement(
          'button',
          { name: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
          this.props.creationForm ? 'Create Unit' : 'Save Changes'
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);