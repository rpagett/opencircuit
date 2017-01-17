'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserOrAdmin = exports.HasRole = exports.userRoleLabel = exports.UserRoles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp2;

exports.userHasRole = userHasRole;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserRoles = exports.UserRoles = Object.freeze({
  Administrator: 1,
  EventDirector: 2,
  FormsManager: 3,
  JudgeManager: 4,
  CircuitStaff: 5
});

var userRoleLabel = exports.userRoleLabel = function userRoleLabel(id) {
  switch (id) {
    case UserRoles.Administrator:
      return 'Administrator';

    case UserRoles.EventDirector:
      return 'Event Director';

    case UserRoles.FormsManager:
      return 'Forms Manager';

    case UserRoles.JudgeManager:
      return 'Judge Manager';

    case UserRoles.CircuitStaff:
      return 'Circuit Staff';

    default:
      return '';
  }
};

function userHasRole(user, role) {
  return user.roles.includes(UserRoles.Administrator) || user.roles.includes(role);
}

var _HasRole = (_temp = _class = function (_React$Component) {
  _inherits(_HasRole, _React$Component);

  function _HasRole() {
    _classCallCheck(this, _HasRole);

    return _possibleConstructorReturn(this, (_HasRole.__proto__ || Object.getPrototypeOf(_HasRole)).apply(this, arguments));
  }

  _createClass(_HasRole, [{
    key: 'hasRole',
    value: function hasRole() {
      return this.props.user.roles.includes(UserRoles.Administrator) || this.props.user.roles.includes(this.props.role);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.hasRole()) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        this.props,
        this.props.children
      );
    }
  }]);

  return _HasRole;
}(_react2.default.Component), _class.propTypes = {
  user: _react2.default.PropTypes.object.isRequired,
  role: _react2.default.PropTypes.number.isRequired
}, _temp);

var mapStateToHRProps = function mapStateToHRProps(state) {
  return {
    user: state.auth.user
  };
};

var mapDispatchToHRProps = function mapDispatchToHRProps(dispatch) {
  return {};
};

var HasRole = exports.HasRole = (0, _reactRedux.connect)(mapStateToHRProps, mapDispatchToHRProps)(_HasRole);

var _UserOrAdmin = (_temp2 = _class2 = function (_React$Component2) {
  _inherits(_UserOrAdmin, _React$Component2);

  function _UserOrAdmin() {
    _classCallCheck(this, _UserOrAdmin);

    return _possibleConstructorReturn(this, (_UserOrAdmin.__proto__ || Object.getPrototypeOf(_UserOrAdmin)).apply(this, arguments));
  }

  _createClass(_UserOrAdmin, [{
    key: 'canAccess',
    value: function canAccess() {
      return this.props.user.email == this.props.profileEmail || this.props.user.roles.includes(UserRoles.Administrator);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.canAccess()) {
        return null;
      }

      return this.props.children;
    }
  }]);

  return _UserOrAdmin;
}(_react2.default.Component), _class2.propTypes = {
  user: _react2.default.PropTypes.object.isRequired,
  profileEmail: _react2.default.PropTypes.string.isRequired
}, _temp2);

var mapStateToUOAProps = function mapStateToUOAProps(state) {
  return {
    user: state.auth.user
  };
};

var mapDispatchToUOAProps = function mapDispatchToUOAProps(dispatch) {
  return {};
};

var UserOrAdmin = exports.UserOrAdmin = (0, _reactRedux.connect)(mapStateToUOAProps, mapDispatchToUOAProps)(_UserOrAdmin);