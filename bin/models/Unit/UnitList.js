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

var UnitList = function (_React$Component) {
  _inherits(UnitList, _React$Component);

  function UnitList() {
    _classCallCheck(this, UnitList);

    return _possibleConstructorReturn(this, (UnitList.__proto__ || Object.getPrototypeOf(UnitList)).apply(this, arguments));
  }

  _createClass(UnitList, [{
    key: 'canEdit',
    value: function canEdit(unit, user) {
      if (unit.director._id.toString() == user._id.toString() || (0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.EventDirector)) {
        return unit.detailsUrl + '/edit';
      }

      return null;
    }
  }, {
    key: 'canDelete',
    value: function canDelete(unit, user) {
      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator)) {
        return '/api' + unit.detailsUrl;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'unitList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no registered units.',
          columns: {
            'Name': function Name(unit) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: unit.detailsUrl },
                unit.name
              );
            },
            'Director': function Director(unit) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: unit.director ? unit.director.profileUrl : '#' },
                unit.director ? unit.director.formattedName : 'none'
              );
            },
            'Type': function Type(unit) {
              return unit.unit_type.name;
            },
            'Class': function Class(unit) {
              return unit.competition_class ? unit.competition_class.formattedName : 'none';
            }
          },
          canEdit: this.canEdit,
          canDelete: this.canDelete,
          deriveName: function deriveName(unit) {
            return unit.name;
          }
        })
      );
    }
  }]);

  return UnitList;
}(_react2.default.Component);

exports.default = UnitList;
;
module.exports = exports['default'];