'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FlexTable = require('../../flexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { connect } from 'react-redux';


//import * as UserActions from './UserActions';


//import LoadingCube from '../../helpers/LoadingCube';

var UserList = function (_React$Component) {
  _inherits(UserList, _React$Component);

  function UserList() {
    _classCallCheck(this, UserList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserList).apply(this, arguments));
  }

  _createClass(UserList, [{
    key: 'componentDidMount',

    //static propTypes = {
    //  endpoint: React.PropTypes.string.isRequired,
    //  body: React.PropTypes.object
    //}
    //
    //static defaultProps = {
    //  isLoading: true
    //}

    value: function componentDidMount() {
      //this.props.fetchUsers();
    }
  }, {
    key: 'render',
    value: function render() {
      //if (this.props.isLoading === true) {
      //  return (
      //    <div className="container" style={{ 'height': '100%' }}>
      //      <LoadingCube show={ true } />
      //    </div>
      //  );
      //}
      //
      //if (this.props.error) {
      //  return (
      //    <div className="container">
      //      <strong>There was an error: { this.props.error }.</strong>
      //    </div>
      //  );
      //}
      //
      //const users = this.props.users;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          endpoint: '/api/users',
          emptyMessage: 'There are no registered users.',
          columns: {
            'Name': function Name(user) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: user.profileURL },
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
            }
          }
        })
      );
    }
  }]);

  return UserList;
}(_react2.default.Component);

;

//const mapStateToProps = (state) => {
//  return {
//    users: state.users.listUsers,
//    error: state.users.listError,
//    isLoading: state.users.listLoading
//  }
//}
//
//const mapDispatchToProps = (dispatch, ownProps) => {
//  return {
//    fetchUsers: () => {
//      dispatch(UserActions.fetchUserList(ownProps.endpoint, ownProps.body));
//    }
//  };
//};

//const UserList = connect(mapStateToProps, mapDispatchToProps)(_UserList);
exports.default = UserList;