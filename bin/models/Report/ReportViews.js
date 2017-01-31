'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spiels = exports.Music = exports.MailChimp = exports.DrawStatus = exports.Quickbooks = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
              { to: '/reports/drawstatus' },
              'Draw Status'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/reports/mailchimp' },
              'Mailchimp'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/reports/music' },
              'Music'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/reports/quickbooks' },
              'Quickbooks'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/reports/spiels' },
              'Spiels'
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

    return _possibleConstructorReturn(this, (_Quickbooks.__proto__ || Object.getPrototypeOf(_Quickbooks)).apply(this, arguments));
  }

  _createClass(_Quickbooks, [{
    key: 'render',
    value: function render() {
      var rows = [];
      var lastWeek = 0;
      this.props.contents.map(function (unit) {
        var date = (0, _moment2.default)(unit.createdAt);

        if (date.week() != lastWeek) {
          rows.push(_react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('p', null)
          ));
          lastWeek = date.week();
        }

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
            { className: 'col-xs-3' },
            date.format('MMM. Do, YYYY h:mm a')
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3' },
            (0, _moment2.default)(unit.confirmed_paid_date).format('MMM. Do, YYYY h:mm a')
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
            { className: 'col-xs-3' },
            _react2.default.createElement(
              'strong',
              null,
              'Registration Date'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3' },
            _react2.default.createElement(
              'strong',
              null,
              'Paid Date'
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

    return _possibleConstructorReturn(this, (Quickbooks.__proto__ || Object.getPrototypeOf(Quickbooks)).apply(this, arguments));
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

var _DrawStatus = function (_React$Component4) {
  _inherits(_DrawStatus, _React$Component4);

  function _DrawStatus() {
    _classCallCheck(this, _DrawStatus);

    return _possibleConstructorReturn(this, (_DrawStatus.__proto__ || Object.getPrototypeOf(_DrawStatus)).apply(this, arguments));
  }

  _createClass(_DrawStatus, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (unit) {
        rows.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-xs-1 col-xs-4' },
            unit.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3' },
            unit.director.formattedName
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4 ' + unit.paymentClass },
            unit.paymentStatus
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Draw Status Report'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-xs-1 col-xs-4' },
            _react2.default.createElement(
              'strong',
              null,
              'Unit'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3' },
            _react2.default.createElement(
              'strong',
              null,
              'Director'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement(
              'strong',
              null,
              'Payment'
            )
          )
        ),
        rows
      );
    }
  }]);

  return _DrawStatus;
}(_react2.default.Component);

var DrawStatus = exports.DrawStatus = function (_React$Component5) {
  _inherits(DrawStatus, _React$Component5);

  function DrawStatus() {
    _classCallCheck(this, DrawStatus);

    return _possibleConstructorReturn(this, (DrawStatus.__proto__ || Object.getPrototypeOf(DrawStatus)).apply(this, arguments));
  }

  _createClass(DrawStatus, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'report_drawstatus',
        endpoint: '/api/reports/drawstatus',
        component: _DrawStatus
      });
    }
  }]);

  return DrawStatus;
}(_react2.default.Component);

var _MailChimp = function (_React$Component6) {
  _inherits(_MailChimp, _React$Component6);

  function _MailChimp() {
    _classCallCheck(this, _MailChimp);

    return _possibleConstructorReturn(this, (_MailChimp.__proto__ || Object.getPrototypeOf(_MailChimp)).apply(this, arguments));
  }

  _createClass(_MailChimp, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (unit) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: unit._id },
          _react2.default.createElement(
            'td',
            { key: unit._id + 'a' },
            unit.name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'b' },
            unit.director.first_name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'c' },
            unit.director.last_name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'd' },
            unit.director.email
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'e' },
            unit.director.phone
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'f' },
            unit.organization.street
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'g' },
            unit.organization.street_2
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'h' },
            unit.organization.city
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'i' },
            unit.organization.state
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'j' },
            unit.organization.zip
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'k' },
            unit.organization.name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'l' },
            unit.unit_type.name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'm' },
            unit.competition_class ? unit.competition_class.name : 'none'
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + 'n' },
            unit.eventList
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'MailChimp CSV'
        ),
        _react2.default.createElement(
          'table',
          { className: 'table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Unit'
              ),
              _react2.default.createElement(
                'th',
                null,
                'First Name'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Last Name'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Email'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Phone'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Street'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Street 2'
              ),
              _react2.default.createElement(
                'th',
                null,
                'City'
              ),
              _react2.default.createElement(
                'th',
                null,
                'State'
              ),
              _react2.default.createElement(
                'th',
                null,
                'ZIP'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Organization'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Unit Type'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Class'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Events'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            rows
          )
        )
      );
    }
  }]);

  return _MailChimp;
}(_react2.default.Component);

var MailChimp = exports.MailChimp = function (_React$Component7) {
  _inherits(MailChimp, _React$Component7);

  function MailChimp() {
    _classCallCheck(this, MailChimp);

    return _possibleConstructorReturn(this, (MailChimp.__proto__ || Object.getPrototypeOf(MailChimp)).apply(this, arguments));
  }

  _createClass(MailChimp, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'report_mailchimp',
        endpoint: '/api/reports/mailchimp',
        component: _MailChimp
      });
    }
  }]);

  return MailChimp;
}(_react2.default.Component);

var _Music = function (_React$Component8) {
  _inherits(_Music, _React$Component8);

  function _Music() {
    _classCallCheck(this, _Music);

    return _possibleConstructorReturn(this, (_Music.__proto__ || Object.getPrototypeOf(_Music)).apply(this, arguments));
  }

  _createClass(_Music, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (unit) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: unit._id + '_row' },
          _react2.default.createElement(
            'td',
            { key: unit._id + '_name' },
            unit.name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_class' },
            unit.competition_class.abbreviation.toUpperCase()
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_director' },
            unit.director.formattedName
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_email' },
            unit.director.email
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_status' },
            unit.last_music_submission ? (0, _moment2.default)(unit.last_music_submission).format('MMM. Do, YYYY [at] h:mm a') : 'None'
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Music Status Report'
        ),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Unit'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Class'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Director'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Email'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Music Status'
                )
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            rows
          )
        )
      );
    }
  }]);

  return _Music;
}(_react2.default.Component);

var Music = exports.Music = function (_React$Component9) {
  _inherits(Music, _React$Component9);

  function Music() {
    _classCallCheck(this, Music);

    return _possibleConstructorReturn(this, (Music.__proto__ || Object.getPrototypeOf(Music)).apply(this, arguments));
  }

  _createClass(Music, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'report_music',
        endpoint: '/api/reports/music',
        component: _Music
      });
    }
  }]);

  return Music;
}(_react2.default.Component);

var _Spiels = function (_React$Component10) {
  _inherits(_Spiels, _React$Component10);

  function _Spiels() {
    _classCallCheck(this, _Spiels);

    return _possibleConstructorReturn(this, (_Spiels.__proto__ || Object.getPrototypeOf(_Spiels)).apply(this, arguments));
  }

  _createClass(_Spiels, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (unit) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: unit._id + '_row' },
          _react2.default.createElement(
            'td',
            { key: unit._id + '_name' },
            unit.name
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_class' },
            unit.competition_class.abbreviation.toUpperCase()
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_director' },
            unit.director.formattedName
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_email' },
            unit.director.email
          ),
          _react2.default.createElement(
            'td',
            { key: unit._id + '_status' },
            unit.spiel ? (0, _moment2.default)(unit.spiel.updatedAt).format('MMM. Do, YYYY [at] h:mm a') : 'Never'
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Spiel Status Report'
        ),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Unit'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Class'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Director'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Email'
                )
              ),
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Last Spiel Update'
                )
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            rows
          )
        )
      );
    }
  }]);

  return _Spiels;
}(_react2.default.Component);

var Spiels = exports.Spiels = function (_React$Component11) {
  _inherits(Spiels, _React$Component11);

  function Spiels() {
    _classCallCheck(this, Spiels);

    return _possibleConstructorReturn(this, (Spiels.__proto__ || Object.getPrototypeOf(Spiels)).apply(this, arguments));
  }

  _createClass(Spiels, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'report_spiels',
        endpoint: '/api/reports/spiels',
        component: _Spiels
      });
    }
  }]);

  return Spiels;
}(_react2.default.Component);