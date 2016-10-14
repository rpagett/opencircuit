'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Show = exports.Edit = exports.New = exports.Index = undefined;

var _class, _temp;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _ModelInfo = require('../../layout/ModelInfo');

var _UserRoles = require('../User/UserRoles');

var _EventList = require('./EventList');

var _EventList2 = _interopRequireDefault(_EventList);

var _UnitsInEventList = require('../Unit/UnitsInEventList');

var _UnitsInEventList2 = _interopRequireDefault(_UnitsInEventList);

var _EventForms = require('./EventForms');

var EventForms = _interopRequireWildcard(_EventForms);

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
          'Events'
        ),
        _react2.default.createElement(_EventList2.default, { endpoint: '/api/events' }),
        _react2.default.createElement('p', null),
        _react2.default.createElement('hr', null),
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.Administrator, className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 offset-sm-1 col-sm-10' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/events/new', className: 'btn btn-block btn-success-outline btn-sm' },
              'Create an Event'
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
          'New Event'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(EventForms.Edit, { creationForm: true })
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
          'Editing Event'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(EventForms.Edit, { slug: this.props.params.slug })
          )
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);

var _Show = (_temp = _class = function (_React$Component4) {
  _inherits(_Show, _React$Component4);

  function _Show() {
    _classCallCheck(this, _Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Show).apply(this, arguments));
  }

  _createClass(_Show, [{
    key: 'render',
    value: function render() {
      var event = this.props.model;

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid model-info' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          event.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Date and Time'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            event.formattedDate
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Attendance Cap'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            event.attendance_cap
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Facebook Page'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            _react2.default.createElement(
              'a',
              { href: event.facebook_url },
              event.facebook_url
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Adult Tickets'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            '$',
            event.adult_ticket_price
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Youth Tickets'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            '$',
            event.youth_ticket_price
          )
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Registration Is...'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            event.registration_closed ? _react2.default.createElement(
              'span',
              { className: 'text-danger' },
              ' ',
              'closed'
            ) : _react2.default.createElement(
              'span',
              { className: 'text-success' },
              ' ',
              'open'
            )
          )
        ),
        !event.registration_closed && event.registration_autoclose ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Autocloses On...'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            event.formattedRegistrationAutoclose
          )
        ) : '',
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Critique Registration is...'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            event.critique_closed ? _react2.default.createElement(
              'span',
              { className: 'text-danger' },
              'closed'
            ) : _react2.default.createElement(
              'span',
              { className: 'text-success' },
              'open'
            )
          )
        ),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.EventDirector },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              _ModelInfo.Prop,
              null,
              'Notes'
            ),
            _react2.default.createElement(
              _ModelInfo.Val,
              null,
              event.notes
            )
          )
        ),
        event.confirmedUnits ? _react2.default.createElement(
          'div',
          null,
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
              { className: 'card col-xs-12' },
              _react2.default.createElement(
                'div',
                { className: 'card-header card-success' },
                'Confirmed Units'
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-block' },
                _react2.default.createElement(_UnitsInEventList2.default, { name: 'event_confirmed_units', contents: event.confirmedUnits })
              )
            )
          )
        ) : null,
        event.waitlistUnits.length ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'card col-xs-12' },
              _react2.default.createElement(
                'div',
                { className: 'card-header card-warning' },
                'Units on Waitlist'
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-block' },
                _react2.default.createElement(_UnitsInEventList2.default, { name: 'event_waitlist_units', contents: event.waitlistUnits })
              )
            )
          )
        ) : null,
        event.unpaidUnits.length ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'card col-xs-12' },
              _react2.default.createElement(
                'div',
                { className: 'card-header card-danger' },
                'Units Awaiting Payment'
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-block' },
                _react2.default.createElement(_UnitsInEventList2.default, { name: 'event_unpaid_units', contents: event.unpaidUnits })
              )
            )
          )
        ) : null,
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.EventDirector },
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
                { to: '/events/' + event.slug + '/edit', className: 'btn btn-sm btn-outline-secondary btn-block' },
                'Edit Event'
              )
            )
          )
        )
      );
    }
  }]);

  return _Show;
}(_react2.default.Component), _class.propTypes = {
  model: _react2.default.PropTypes.object
}, _temp);

var Show = exports.Show = function (_React$Component5) {
  _inherits(Show, _React$Component5);

  function Show() {
    _classCallCheck(this, Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Show).apply(this, arguments));
  }

  _createClass(Show, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ModelView2.default, {
        subStore: 'event_show',
        endpoint: '/api/events/' + this.props.params.slug,
        component: _Show
      });
    }
  }]);

  return Show;
}(_react2.default.Component);