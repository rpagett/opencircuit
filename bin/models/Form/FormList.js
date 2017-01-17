'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _UserRoles = require('../User/UserRoles');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

var _ModalActions = require('../../modals/ModalActions');

var _SpawnableModal = require('../../modals/SpawnableModal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormList = function (_React$Component) {
  _inherits(FormList, _React$Component);

  function FormList() {
    _classCallCheck(this, FormList);

    return _possibleConstructorReturn(this, (FormList.__proto__ || Object.getPrototypeOf(FormList)).apply(this, arguments));
  }

  _createClass(FormList, [{
    key: 'canEdit',
    value: function canEdit(form, user) {
      return null;
    }
  }, {
    key: 'canDelete',
    value: function canDelete(form, user) {
      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator)) {
        return '/api/forms/' + form._id;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'formList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no forms.',
          columns: {
            'Name': function Name(form) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: '/forms/' + form._id },
                form.name
              );
            },
            'Assigned To': function AssignedTo(form) {
              return form.assignedUnitCount;
            },
            'Auto-Apply': function AutoApply(form) {
              return form.autoApplyList;
            },
            'Download': function Download(form) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: '/api/forms/' + form._id + '/download', target: '_blank' },
                'View'
              );
            },
            'Assign...': function Assign(form) {
              return _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                className: 'btn btn-sm btn-outline-danger',
                buttonText: 'Assign to Unit',

                title: 'Assign Form',
                componentName: 'FORM_ASSIGN_OBLIGATION',
                modalProps: {
                  form: form,
                  refreshTable: 'formList',
                  refreshEndpoint: _this2.props.endpoint
                }
              });
            }
          },
          canEdit: this.canEdit,
          canDelete: this.canDelete,
          deriveName: function deriveName(form) {
            return form.name;
          }
        })
      );
    }
  }]);

  return FormList;
}(_react2.default.Component);

exports.default = FormList;
;
module.exports = exports['default'];