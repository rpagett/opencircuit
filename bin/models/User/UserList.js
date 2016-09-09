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

var _ModalActions = require('../../modals/ModalActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserList = function (_React$Component) {
  _inherits(UserList, _React$Component);

  function UserList() {
    _classCallCheck(this, UserList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserList).apply(this, arguments));
  }

  _createClass(UserList, [{
    key: 'launchRolesOverlay',
    value: function launchRolesOverlay(dispatch) {
      dispatch((0, _ModalActions.launch)(this.formattedName + '\'s Roles', 'USER_ROLES', {
        email: this.email
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'userList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no registered users.',
          columns: {
            'Name': function Name(user) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: user.profileUrl },
                user.formattedName
              );
            },
            'Email': function Email(user) {
              return _react2.default.createElement(
                'a',
                { href: 'mailto:' + user.email },
                user.email
              );
            },
            'Phone': function Phone(user) {
              return user.phone;
            },
            'Roles': function Roles(user, dispatch) {
              return _react2.default.createElement(
                'button',
                { onClick: _this2.launchRolesOverlay.bind(user, dispatch), className: 'btn btn-sm btn-info' },
                'Manage...'
              );
            }
          }
        })
      );
    }
  }]);

  return UserList;
}(_react2.default.Component);

exports.default = UserList;
;