'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      var fetch = {};

      if (this.props.creationForm) {
        fetch.submitEndpoint = '/api/events';
        fetch.submitMethod = 'POST';
      } else {
        fetch.submitEndpoint = '/api/events/' + this.props.slug;
        fetch.fetchEndpoint = '/api/events/edit/' + this.props.slug;
        fetch.submitMethod = 'PATCH';
      }

      return _react2.default.createElement(
        _components.ReduxForm,
        _extends({
          subStore: 'event_edit'
        }, fetch),
        _react2.default.createElement(_components.FormInput, { name: 'name', label: 'Name' }),
        _react2.default.createElement(_components.DateTime, { name: 'date', label: 'Date and Time' }),
        _react2.default.createElement(_components.FormInput, { type: 'url', name: 'facebook_url', label: 'Facebook Event URL' }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_components.FormInput, { type: 'number', name: 'attendance_cap', label: 'Attendance Cap' }),
        _react2.default.createElement(_components.Checkbox, { inForm: true, name: 'registration_closed', label: 'Registration Closed?' }),
        _react2.default.createElement(_components.DateTime, { name: 'registration_autoclose', label: 'Auto-close On...' }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_components.FormInput, { type: 'number', beforeInput: '$', name: 'adult_ticket_price', label: 'Adult Tickets' }),
        _react2.default.createElement(_components.FormInput, { type: 'number', beforeInput: '$', name: 'youth_ticket_price', label: 'Youth Tickets' }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_components.TextArea, { name: 'notes', label: 'Administrative Notes' }),
        _react2.default.createElement(_components.Checkbox, { inForm: true, name: 'critique_closed', label: 'Critique Registration Closed?' }),
        _react2.default.createElement(
          'button',
          { name: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
          this.props.creationForm ? 'Create Event' : 'Save Changes'
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);