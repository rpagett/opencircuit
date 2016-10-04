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

var UnitsInEventList = function (_React$Component) {
  _inherits(UnitsInEventList, _React$Component);

  function UnitsInEventList() {
    _classCallCheck(this, UnitsInEventList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnitsInEventList).apply(this, arguments));
  }

  _createClass(UnitsInEventList, [{
    key: 'canEdit',
    value: function canEdit(reg, user) {
      if (reg.unit.director._id.toString() == user._id.toString() || (0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.EventDirector)) {
        return reg.unit.detailsUrl + '/edit';
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
          name: this.props.name,
          fedContents: this.props.contents,
          emptyMessage: 'There are no registered units.',
          columns: {
            'Name': function Name(reg) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: reg.unit ? reg.unit.detailsUrl : 'error' },
                reg.unit ? reg.unit.name : 'error'
              );
            },
            'Director': function Director(reg) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: reg.unit && reg.unit.director ? reg.unit.director.profileUrl : '#' },
                reg.unit && reg.unit.director ? reg.unit.director.formattedName : 'error'
              );
            },
            'Type': function Type(reg) {
              return reg.unit && reg.unit.unit_type ? reg.unit.unit_type.name : 'error';
            },
            'Class': function Class(reg) {
              return reg.competition_class ? reg.competition_class.formattedName : 'error';
            }
          },
          canEdit: this.canEdit,
          deriveName: function deriveName(reg) {
            return reg.unit.name;
          }
        })
      );
    }
  }]);

  return UnitsInEventList;
}(_react2.default.Component);

exports.default = UnitsInEventList;
;
module.exports = exports['default'];