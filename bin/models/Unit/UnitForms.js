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

var _ClassBox = function (_React$Component) {
  _inherits(_ClassBox, _React$Component);

  function _ClassBox() {
    _classCallCheck(this, _ClassBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_ClassBox).apply(this, arguments));
  }

  _createClass(_ClassBox, [{
    key: 'render',
    value: function render() {
      console.log('FORMSTORE', this.props.formModel);
      return _react2.default.createElement(_components.ClassSelect, {
        name: 'competition_class',
        label: 'Class',
        formStore: 'unit_edit',
        unitType: this.props.formModel.unit_type._id,
        scholastic: this.props.formModel.organization.is_school
        //value={ this.props.formModel.competition_class._id }
      });
    }
  }]);

  return _ClassBox;
}(_react2.default.Component);

var Edit = exports.Edit = function (_React$Component2) {
  _inherits(Edit, _React$Component2);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Edit).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'render',
    value: function render() {
      var fetch = {};

      if (this.props.creationForm) {
        fetch.submitEndpoint = '/api/units';
        fetch.submitMethod = 'POST';
      } else {
        fetch.submitEndpoint = '/api/units/' + this.props.slug;
        fetch.fetchEndpoint = '/api/units/' + this.props.slug;
        fetch.submitMethod = 'PATCH';
      }

      return _react2.default.createElement(
        _components.ReduxForm,
        _extends({
          subStore: 'unit_edit'
        }, fetch),
        _react2.default.createElement(_components.FormStatic, { name: 'name', label: 'Name' }),
        _react2.default.createElement(_components.FormInput, { type: 'number', name: 'members', label: 'Member Count' }),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.EventDirector },
          _react2.default.createElement(_components.TextArea, { name: 'notes', label: 'Administrative Notes' }),
          _react2.default.createElement(_ClassBox, null)
        ),
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