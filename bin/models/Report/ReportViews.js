'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quickbooks = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ContentsView = require('../../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

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
          'Reports'
        ),
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/reports/quickbooks' },
              'Quickbooks'
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var _Quickbooks = function (_React$Component2) {
  _inherits(_Quickbooks, _React$Component2);

  function _Quickbooks() {
    _classCallCheck(this, _Quickbooks);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Quickbooks).apply(this, arguments));
  }

  _createClass(_Quickbooks, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (unit) {
        rows.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-xs-1 col-xs-5' },
            unit.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-5' },
            unit.formattedCreationDate
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Units by Registration Date'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-xs-1 col-xs-5' },
            _react2.default.createElement(
              'strong',
              null,
              'Unit'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-5' },
            _react2.default.createElement(
              'strong',
              null,
              'Registration Date'
            )
          )
        ),
        rows
      );
    }
  }]);

  return _Quickbooks;
}(_react2.default.Component);

var Quickbooks = exports.Quickbooks = function (_React$Component3) {
  _inherits(Quickbooks, _React$Component3);

  function Quickbooks() {
    _classCallCheck(this, Quickbooks);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Quickbooks).apply(this, arguments));
  }

  _createClass(Quickbooks, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'report_quickbooks',
        endpoint: '/api/reports/quickbooks',
        component: _Quickbooks
      });
    }
  }]);

  return Quickbooks;
}(_react2.default.Component);