'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registration = exports.Critique = exports.Lineup = exports.Times = exports.Show = exports.Edit = exports.New = exports.Index = undefined;

var _class, _temp;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _LoadingCube = require('../../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _ContentsView = require('../../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

var _ModelInfo = require('../../layout/ModelInfo');

var _UserRoles = require('../User/UserRoles');

var _components = require('../../forms/components');

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

    return _possibleConstructorReturn(this, (_Show.__proto__ || Object.getPrototypeOf(_Show)).apply(this, arguments));
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
        event.facebook_url ? _react2.default.createElement(
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
        ) : _react2.default.createElement('div', null),
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
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.CircuitStaff },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'card offset-xs-1 col-xs-10' },
              _react2.default.createElement(
                'div',
                { className: 'card-header card-success' },
                'Staff Toolbox'
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-block' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-6' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/events/' + event.slug + '/times', className: 'btn btn-block btn-primary' },
                      'Set Performance Times'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-6' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/events/' + event.slug + '/lineup', className: 'btn btn-block btn-primary' },
                      'Show Lineup'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-6' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/spiels/event/' + event.slug, className: 'btn btn-block btn-primary' },
                      'Spiels'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-6' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/events/' + event.slug + '/critique', className: 'btn btn-block btn-primary' },
                      'Critique Schedule'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/events/' + event.slug + '/registration', className: 'btn btn-block btn-secondary' },
                      'Registration Worksheet'
                    )
                  )
                )
              )
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

    return _possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
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

var _Times = function (_React$Component6) {
  _inherits(_Times, _React$Component6);

  function _Times() {
    _classCallCheck(this, _Times);

    return _possibleConstructorReturn(this, (_Times.__proto__ || Object.getPrototypeOf(_Times)).apply(this, arguments));
  }

  _createClass(_Times, [{
    key: 'render',
    value: function render() {
      var regs = this.props.contents;
      var rows = [];

      regs.map(function (reg) {
        rows.push(_react2.default.createElement(_components.PerformanceTime, { key: reg.unit._id, label: reg.unit.name, name: 'performance_time.' + reg.unit._id, value: reg.performance_time }));
      });
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Performance Times'
        ),
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'event_perftimes',
            fetchEndpoint: '/api/events/' + this.props.slug + '/times',
            submitEndpoint: '/api/events/' + this.props.slug + '/times',
            submitMethod: 'PATCH'
          },
          rows,
          _react2.default.createElement(
            'button',
            { type: 'submit', role: 'submit', className: 'btn btn-success btn-block' },
            'Submit'
          )
        )
      );
    }
  }]);

  return _Times;
}(_react2.default.Component);

var Times = exports.Times = function (_React$Component7) {
  _inherits(Times, _React$Component7);

  function Times() {
    _classCallCheck(this, Times);

    return _possibleConstructorReturn(this, (Times.__proto__ || Object.getPrototypeOf(Times)).apply(this, arguments));
  }

  _createClass(Times, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'event_times',
        endpoint: '/api/events/' + this.props.params.slug + '/lineup',
        component: _Times,
        slug: this.props.params.slug
      });
    }
  }]);

  return Times;
}(_react2.default.Component);

var _Lineup = function (_React$Component8) {
  _inherits(_Lineup, _React$Component8);

  function _Lineup() {
    _classCallCheck(this, _Lineup);

    return _possibleConstructorReturn(this, (_Lineup.__proto__ || Object.getPrototypeOf(_Lineup)).apply(this, arguments));
  }

  _createClass(_Lineup, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (reg) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: reg._id },
          _react2.default.createElement(
            'td',
            { key: reg._id + '-name' },
            reg.unit.name
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-fname' },
            reg.unit.director.formattedName
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-spiel' },
            reg.unit.spiel ? reg.unit.spiel.show_title : 'No Spiel'
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-class' },
            reg.unit.competition_class.abbreviation.toUpperCase()
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-time' },
            reg.performance_time
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-crt' },
            reg.attending_critique ? 'Attending' : ''
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Lineup'
        ),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'table',
            { className: 'table table-responsive' },
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
                    'Director'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Title'
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
                    'Time'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Critique'
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
        )
      );
    }
  }]);

  return _Lineup;
}(_react2.default.Component);

var Lineup = exports.Lineup = function (_React$Component9) {
  _inherits(Lineup, _React$Component9);

  function Lineup() {
    _classCallCheck(this, Lineup);

    return _possibleConstructorReturn(this, (Lineup.__proto__ || Object.getPrototypeOf(Lineup)).apply(this, arguments));
  }

  _createClass(Lineup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'event_lineup',
        endpoint: '/api/events/' + this.props.params.slug + '/lineup',
        component: _Lineup,
        slug: this.props.params.slug
      });
    }
  }]);

  return Lineup;
}(_react2.default.Component);

var _Critique = function (_React$Component10) {
  _inherits(_Critique, _React$Component10);

  function _Critique() {
    _classCallCheck(this, _Critique);

    return _possibleConstructorReturn(this, (_Critique.__proto__ || Object.getPrototypeOf(_Critique)).apply(this, arguments));
  }

  _createClass(_Critique, [{
    key: 'render',
    value: function render() {
      var rows = [];
      this.props.contents.map(function (reg) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: reg._id },
          _react2.default.createElement(
            'td',
            { key: reg._id + '-name' },
            reg.unit.name
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-fname' },
            reg.unit.director.formattedName
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-title' },
            reg.unit.spiel && reg.unit.spiel.show_title ? reg.unit.spiel.show_title : 'No Title'
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-class' },
            reg.unit.competition_class.abbreviation.toUpperCase()
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-time' },
            reg.performance_time
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Attending Critique'
        ),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'table',
            { className: 'table table-responsive' },
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
                    'Director'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Title'
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
                    'Perf. Time'
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
        )
      );
    }
  }]);

  return _Critique;
}(_react2.default.Component);

var Critique = exports.Critique = function (_React$Component11) {
  _inherits(Critique, _React$Component11);

  function Critique() {
    _classCallCheck(this, Critique);

    return _possibleConstructorReturn(this, (Critique.__proto__ || Object.getPrototypeOf(Critique)).apply(this, arguments));
  }

  _createClass(Critique, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'event_critique',
        endpoint: '/api/events/' + this.props.params.slug + '/critique',
        component: _Critique,
        slug: this.props.params.slug
      });
    }
  }]);

  return Critique;
}(_react2.default.Component);

var _Registration = function (_React$Component12) {
  _inherits(_Registration, _React$Component12);

  function _Registration() {
    _classCallCheck(this, _Registration);

    return _possibleConstructorReturn(this, (_Registration.__proto__ || Object.getPrototypeOf(_Registration)).apply(this, arguments));
  }

  _createClass(_Registration, [{
    key: 'render',
    value: function render() {
      var rows = [];

      this.props.contents.map(function (reg) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: reg._id },
          _react2.default.createElement(
            'td',
            { key: reg._id + '-name' },
            reg.unit.name
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-director' },
            reg.unit.director.formattedName
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-time' },
            reg.performance_time
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-staff' },
            reg.unit.plus_pass ? 12 : 7
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-members' },
            reg.unit.members
          ),
          _react2.default.createElement(
            'td',
            { key: reg._id + '-notes' },
            reg.missing
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Registration Worksheet'
        ),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'table',
            { className: 'table table-responsive' },
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
                    'Director'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Perf. Time'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Staff'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Members'
                  )
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Notes'
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
        )
      );
    }
  }]);

  return _Registration;
}(_react2.default.Component);

var Registration = exports.Registration = function (_React$Component13) {
  _inherits(Registration, _React$Component13);

  function Registration() {
    _classCallCheck(this, Registration);

    return _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).apply(this, arguments));
  }

  _createClass(Registration, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'event_registration',
        endpoint: '/api/events/' + this.props.params.slug + '/registration',
        component: _Registration,
        slug: this.props.params.slug
      });
    }
  }]);

  return Registration;
}(_react2.default.Component);