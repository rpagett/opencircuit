'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = exports.Show = exports._UserProfile = exports.Index = undefined;

var _class, _temp;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _UserActions = require('./UserActions');

var UserActions = _interopRequireWildcard(_UserActions);

var _LoadingCube = require('../../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _UserList = require('./UserList');

var _UserList2 = _interopRequireDefault(_UserList);

var _gravatars = require('../../helpers/gravatars');

var _ModelInfo = require('../../layout/ModelInfo');

var _UserForms = require('./UserForms');

var UserForms = _interopRequireWildcard(_UserForms);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = exports.Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
  }

  _createClass(Index, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Users'
        ),
        _react2.default.createElement(_UserList2.default, { endpoint: '/api/users' })
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var _UserProfile = exports._UserProfile = (_temp = _class = function (_React$Component2) {
  _inherits(_UserProfile, _React$Component2);

  function _UserProfile() {
    _classCallCheck(this, _UserProfile);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UserProfile).apply(this, arguments));
  }

  _createClass(_UserProfile, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetchUserProfile(this.props.email);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.error) {
        return _react2.default.createElement(
          'strong',
          null,
          this.props.error
        );
      }
      if (this.props.isLoading) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_LoadingCube2.default, { show: true })
        );
      }

      var user = this.props.user;

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid model-info' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_gravatars.ProfileGravatar, { email: user.email })
        ),
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          user.formattedName
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Email'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            _react2.default.createElement(
              'a',
              { href: user.email },
              user.email
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Phone'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            user.phone
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Address'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            user.street,
            _react2.default.createElement('br', null),
            user.address_2 ? user.address_2 + '<br />' : '',
            user.city,
            ', ',
            user.state,
            ' ',
            user.zip
          )
        )
      );
    }
  }]);

  return _UserProfile;
}(_react2.default.Component), _class.propTypes = {
  email: _react2.default.PropTypes.string.isRequired
}, _class.defaultProps = {
  isLoading: true
}, _temp);

var mapStateToUserProfileProps = function mapStateToUserProfileProps(state) {
  return {
    user: state.users.profileUser,
    error: state.users.profileError,
    isLoading: state.users.profileLoading
  };
};

var mapDispatchToUserProfileProps = function mapDispatchToUserProfileProps(dispatch) {
  return {
    fetchUserProfile: function fetchUserProfile(email) {
      dispatch(UserActions.fetchProfile(email));
    }
  };
};

var UserProfile = (0, _reactRedux.connect)(mapStateToUserProfileProps, mapDispatchToUserProfileProps)(_UserProfile);

var Show = exports.Show = function (_React$Component3) {
  _inherits(Show, _React$Component3);

  function Show() {
    _classCallCheck(this, Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Show).apply(this, arguments));
  }

  _createClass(Show, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(UserProfile, { email: this.props.params.email })
      );
    }
  }]);

  return Show;
}(_react2.default.Component);

var Edit = exports.Edit = function (_React$Component4) {
  _inherits(Edit, _React$Component4);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Edit).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Editing User'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-sm-offset-1 col-sm-10' },
            _react2.default.createElement(UserForms.Edit, { email: this.props.params.email })
          )
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);