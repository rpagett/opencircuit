'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

var _UserRoles = require('../User/UserRoles');

var _ModalActions = require('../../modals/ModalActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnitTypeList = function (_React$Component) {
  _inherits(UnitTypeList, _React$Component);

  function UnitTypeList() {
    _classCallCheck(this, UnitTypeList);

    return _possibleConstructorReturn(this, (UnitTypeList.__proto__ || Object.getPrototypeOf(UnitTypeList)).apply(this, arguments));
  }

  _createClass(UnitTypeList, [{
    key: 'canEdit',
    value: function canEdit(type, user) {
      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator)) {
        return type.detailsUrl + '/edit';
      }

      return null;
    }
  }, {
    key: 'canDelete',
    value: function canDelete(type, user) {
      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator) && type.unitCount == 0) {
        return '/api' + type.detailsUrl;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'unitTypeList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no unit types.',
          columns: {
            'Name': function Name(type) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: type.detailsUrl },
                type.name
              );
            },
            'Unit Count': function UnitCount(type) {
              return type.unitCount;
            }
          },
          deriveName: function deriveName(type) {
            return type.name;
          },
          canEdit: this.canEdit,
          canDelete: this.canDelete
        })
      );
    }
  }]);

  return UnitTypeList;
}(_react2.default.Component);

exports.default = UnitTypeList;
;
module.exports = exports['default'];