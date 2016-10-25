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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormObligationList = function (_React$Component) {
  _inherits(FormObligationList, _React$Component);

  function FormObligationList() {
    _classCallCheck(this, FormObligationList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormObligationList).apply(this, arguments));
  }

  _createClass(FormObligationList, [{
    key: 'canEdit',
    value: function canEdit(obl, user) {
      return null;
    }
  }, {
    key: 'canDelete',
    value: function canDelete(obl, user) {
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
          name: 'formObligationList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no form obligations.',
          columns: {
            'Unit': function Unit(obl) {
              return obl.unit.formattedName;
            },
            'Form': function Form(obl) {
              return obl.form.name;
            },
            'Due Date': function DueDate(obl) {
              return obl.formattedDueDate;
            },
            'Submit...': function Submit(obl) {
              return _react2.default.createElement(LaunchModalButton, {
                className: 'btn btn-sm btn-outline-info',
                buttonText: 'Submit Form',

                title: 'Submit Form',
                componentName: 'FORM_SUBMIT_FORM',
                modalProps: {
                  form: form,
                  obl: obl,
                  refreshTable: 'formObligationList',
                  refreshEndpoint: _this2.props.endpoint
                }
              });
            }
          },
          canEdit: this.canEdit,
          canDelete: this.canDelete,
          deriveName: null
        })
      );
    }
  }]);

  return FormObligationList;
}(_react2.default.Component);

exports.default = FormObligationList;
;
module.exports = exports['default'];