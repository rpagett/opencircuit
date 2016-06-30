'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRedux = require('react-redux');

var _UserActions = require('./UserActions');

var UserActions = _interopRequireWildcard(_UserActions);

var _FlexTable = require('../../helpers/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

var _LoadingCube = require('../../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _UserList = (_temp = _class = function (_React$Component) {
  _inherits(_UserList, _React$Component);

  function _UserList() {
    _classCallCheck(this, _UserList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UserList).apply(this, arguments));
  }

  _createClass(_UserList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchUsers();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isLoading === true) {
        return _react2.default.createElement(
          'div',
          { className: 'container', style: { 'height': '100%' } },
          _react2.default.createElement(_LoadingCube2.default, { show: true })
        );
      }

      if (this.props.error) {
        return _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'strong',
            null,
            'There was an error: ',
            this.props.error,
            '.'
          )
        );
      }

      var users = this.props.users;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          emptyMessage: 'There are no registered users.',
          columns: {
            'Name': function Name(user) {
              return user.formattedName;
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
            }
          },
          contents: users
        })
      );
    }
  }]);

  return _UserList;
}(_react2.default.Component), _class.propTypes = {
  endpoint: _react2.default.PropTypes.string.isRequired,
  body: _react2.default.PropTypes.object
}, _class.defaultProps = {
  isLoading: true
}, _temp);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    users: state.users.listUsers,
    error: state.users.listError,
    isLoading: state.users.listLoading
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchUsers: function fetchUsers() {
      dispatch(UserActions.fetchUserList(ownProps.endpoint, ownProps.body));
    }
  };
};

var UserList = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_UserList);
exports.default = UserList;