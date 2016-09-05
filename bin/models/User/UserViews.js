'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = exports.Show = exports._Show = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ModelView = require('../../helpers/modelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _ModelInfo = require('../../layout/ModelInfo');

var _UserRoles = require('./UserRoles');

var _gravatars = require('../../helpers/gravatars');

var _UserList = require('./UserList');

var _UserList2 = _interopRequireDefault(_UserList);

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

var _Show = exports._Show = function (_React$Component2) {
  _inherits(_Show, _React$Component2);

  function _Show() {
    _classCallCheck(this, _Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Show).apply(this, arguments));
  }

  _createClass(_Show, [{
    key: 'render',
    value: function render() {
      var user = this.props.model;

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
              { href: 'mailto:' + user.email },
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
            user.address_2 ? user.address_2 : '',
            user.city,
            ', ',
            user.state,
            ' ',
            user.zip
          )
        ),
        _react2.default.createElement(
          _UserRoles.UserOrAdmin,
          { profileEmail: user.email },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'pull-center col-xs-12 col-sm-offset-4 col-sm-4' },
              _react2.default.createElement(
                'small',
                null,
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/users/' + user.profileUrl + '/edit', className: 'btn btn-sm btn-secondary-outline btn-block' },
                  'Edit Profile'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return _Show;
}(_react2.default.Component);

var Show = exports.Show = function (_React$Component3) {
  _inherits(Show, _React$Component3);

  function Show() {
    _classCallCheck(this, Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Show).apply(this, arguments));
  }

  _createClass(Show, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ModelView2.default, { endpoint: '/api/users/' + this.props.params.email, component: _Show });
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