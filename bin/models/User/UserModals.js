'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageRoles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

var _UserRoles = require('./UserRoles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManageRoles = exports.ManageRoles = function (_React$Component) {
  _inherits(ManageRoles, _React$Component);

  function ManageRoles() {
    _classCallCheck(this, ManageRoles);

    return _possibleConstructorReturn(this, (ManageRoles.__proto__ || Object.getPrototypeOf(ManageRoles)).apply(this, arguments));
  }

  _createClass(ManageRoles, [{
    key: 'render',
    value: function render() {
      var boxes = [];
      for (var key in _UserRoles.UserRoles) {
        boxes.push(_react2.default.createElement(_components.Checkbox, {
          name: 'roles[]',
          key: key,
          label: (0, _UserRoles.userRoleLabel)(_UserRoles.UserRoles[key]),
          value: _UserRoles.UserRoles[key]
        }));
      }

      return _react2.default.createElement(
        'div',
        { className: 'checkbox-group' },
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'user_roles',
            fetchEndpoint: '/api/users/' + this.props.email + '/roles',
            submitEndpoint: '/api/users/' + this.props.email + '/roles',
            submitMethod: 'PATCH',
            inModal: true
          },
          boxes,
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-success btn-block' },
            'Save'
          )
        )
      );
    }
  }]);

  return ManageRoles;
}(_react2.default.Component);