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

var OrganizationList = function (_React$Component) {
  _inherits(OrganizationList, _React$Component);

  function OrganizationList() {
    _classCallCheck(this, OrganizationList);

    return _possibleConstructorReturn(this, (OrganizationList.__proto__ || Object.getPrototypeOf(OrganizationList)).apply(this, arguments));
  }

  _createClass(OrganizationList, [{
    key: 'canEdit',
    value: function canEdit(org, user) {
      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator)) {
        return org.detailsUrl + '/edit';
      }

      return null;
    }
  }, {
    key: 'canDelete',
    value: function canDelete(org, user) {
      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator) && org.unitCount == 0) {
        return '/api' + org.detailsUrl;
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
          name: 'organizationList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no registered organizations.',
          columns: {
            'Name': function Name(org) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: org.detailsUrl },
                org.name
              );
            },
            'Director': function Director(org) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: org.director ? org.director.profileUrl : '#' },
                org.director.formattedName
              );
            },
            'Units': function Units(org) {
              return org.unitCount;
            },
            'Type': function Type(org) {
              return org.is_school ? 'Scholastic' : 'Independent';
            }
          },
          deriveName: function deriveName(org) {
            return org.name;
          },
          canEdit: this.canEdit,
          canDelete: this.canDelete
        })
      );
    }
  }]);

  return OrganizationList;
}(_react2.default.Component);

exports.default = OrganizationList;
;
module.exports = exports['default'];