'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SpawnableModal = require('../../modals/SpawnableModal');

var _UserRoles = require('../User/UserRoles');

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _FormList = require('./FormList');

var _FormList2 = _interopRequireDefault(_FormList);

var _ObligatedUnitsList = require('./ObligatedUnitsList');

var _ObligatedUnitsList2 = _interopRequireDefault(_ObligatedUnitsList);

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
          'Forms'
        ),
        _react2.default.createElement(_FormList2.default, { endpoint: '/api/forms' }),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.Administrator },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('hr', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'pull-xs-center col-xs-12 offset-sm-4 col-sm-4' },
              _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                className: 'btn btn-sm btn-outline-secondary btn-block',
                buttonText: 'Create Form',

                title: 'Create Form',
                componentName: 'FORM_CREATE_FORM',
                modalProps: {
                  refreshTable: 'formList',
                  refreshEndpoint: '/api/forms'
                }
              })
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var View = exports.View = function (_React$Component2) {
  _inherits(View, _React$Component2);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Obligated Units'
        ),
        _react2.default.createElement(_ObligatedUnitsList2.default, { endpoint: '/api/forms/' + this.props.params.form_id + '/assign' })
      );
    }
  }]);

  return View;
}(_react2.default.Component);