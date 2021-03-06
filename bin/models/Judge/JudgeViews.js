'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = exports.New = exports.Show = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _JudgeList = require('./JudgeList');

var _JudgeList2 = _interopRequireDefault(_JudgeList);

var _JudgeForms = require('./JudgeForms');

var JudgeForms = _interopRequireWildcard(_JudgeForms);

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _ModelInfo = require('../../layout/ModelInfo');

var _UserRoles = require('../User/UserRoles');

var _dayparts = require('../../helpers/dayparts');

var _dayparts2 = _interopRequireDefault(_dayparts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = exports.Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
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
          'Judges'
        ),
        _react2.default.createElement('p', null),
        _react2.default.createElement(_JudgeList2.default, { endpoint: '/api/judges' }),
        _react2.default.createElement('p', null),
        _react2.default.createElement('hr', null),
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'pull-xs-center col-xs-12 offset-sm-4 col-sm-4' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/judges/new', className: 'btn btn-sm btn-outline-secondary btn-block' },
              'New Judge'
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var _Show = function (_React$Component2) {
  _inherits(_Show, _React$Component2);

  function _Show() {
    _classCallCheck(this, _Show);

    return _possibleConstructorReturn(this, (_Show.__proto__ || Object.getPrototypeOf(_Show)).apply(this, arguments));
  }

  _createClass(_Show, [{
    key: 'render',
    value: function render() {
      var judge = this.props.model;

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid model-info' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          judge.formattedName
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
              { href: 'mailto:' + judge.email },
              judge.email
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
            judge.phone
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
            judge.street,
            _react2.default.createElement('br', null),
            judge.address_2 ? judge.address_2 : '',
            judge.city,
            ', ',
            judge.state,
            ' ',
            judge.zip
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'ID'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.gender,
            ', born ',
            judge.dob
          )
        ),
        judge.ff_airline ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Frequent Flier'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.ff_airline,
            ', #',
            judge.ff_number
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Airport'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.airport
          )
        ),
        judge.TSA_precheck ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'TSA Precheck #'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.TSA_precheck
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Departures'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            'Friday - ',
            (0, _dayparts2.default)(judge.friday_departure),
            _react2.default.createElement('br', null),
            'Sunday - ',
            (0, _dayparts2.default)(judge.sunday_departure)
          )
        ),
        judge.dietary_needs ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Dietary Needs'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.dietary_needs
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Bio'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.bio
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Comments'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            judge.comments
          )
        ),
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
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/judges/' + judge.email + '/edit', className: 'btn btn-sm btn-outline-secondary btn-block' },
              'Edit Judge'
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

    return _possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
  }

  _createClass(Show, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ModelView2.default, {
        subStore: 'judge_show',
        endpoint: '/api/judges/' + this.props.params.email,
        component: _Show
      });
    }
  }]);

  return Show;
}(_react2.default.Component);

var New = exports.New = function (_React$Component4) {
  _inherits(New, _React$Component4);

  function New() {
    _classCallCheck(this, New);

    return _possibleConstructorReturn(this, (New.__proto__ || Object.getPrototypeOf(New)).apply(this, arguments));
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
          'New Judge Record'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(JudgeForms.Edit, { creationForm: true })
          )
        )
      );
    }
  }]);

  return New;
}(_react2.default.Component);

var Edit = exports.Edit = function (_React$Component5) {
  _inherits(Edit, _React$Component5);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).apply(this, arguments));
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
          'Editing Judge Record'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(JudgeForms.Edit, { email: this.props.params.email })
          )
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);