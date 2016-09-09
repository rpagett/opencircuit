'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Show = exports.Edit = exports.New = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ContentsView = require('../../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

var _UnitTypeForms = require('./UnitTypeForms');

var UnitTypeForms = _interopRequireWildcard(_UnitTypeForms);

var _UnitList = require('../Unit/UnitList');

var _UnitList2 = _interopRequireDefault(_UnitList);

var _UnitTypeList = require('./UnitTypeList');

var _UnitTypeList2 = _interopRequireDefault(_UnitTypeList);

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
          'Unit Types'
        ),
        _react2.default.createElement(_UnitTypeList2.default, { endpoint: '/api/unittypes/table' }),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 offset-sm-1 col-sm-10' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/unittypes/new', className: 'btn btn-block btn-outline-success btn-sm' },
              'Add a New Unit Type'
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var New = exports.New = function (_React$Component2) {
  _inherits(New, _React$Component2);

  function New() {
    _classCallCheck(this, New);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(New).apply(this, arguments));
  }

  _createClass(New, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'New Unit Type'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(UnitTypeForms.Edit, { creationForm: true })
          )
        )
      );
    }
  }]);

  return New;
}(_react2.default.Component);

var Edit = exports.Edit = function (_React$Component3) {
  _inherits(Edit, _React$Component3);

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
          'Editing Unit Type'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(UnitTypeForms.Edit, { slug: this.props.params.slug })
          )
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);

var _Show = function (_React$Component4) {
  _inherits(_Show, _React$Component4);

  function _Show() {
    _classCallCheck(this, _Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Show).apply(this, arguments));
  }

  _createClass(_Show, [{
    key: 'render',
    value: function render() {
      var type = this.props.contents;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          type.name,
          ' Units'
        ),
        _react2.default.createElement(_UnitList2.default, { endpoint: '/api/unittypes/' + type.slug + '/units' })
      );
    }
  }]);

  return _Show;
}(_react2.default.Component);

var Show = exports.Show = function (_React$Component5) {
  _inherits(Show, _React$Component5);

  function Show() {
    _classCallCheck(this, Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Show).apply(this, arguments));
  }

  _createClass(Show, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'unittype_show',
        endpoint: '/api/unittypes/' + this.props.params.slug,
        component: _Show
      });
    }
  }]);

  return Show;
}(_react2.default.Component);