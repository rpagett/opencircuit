'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Confirm = exports.EventRegistration = exports.Details = exports.Unit = exports.Organization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _components = require('../../forms/components');

var _ContentsView = require('../../helpers/contentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Organization = exports.Organization = function (_React$Component) {
  _inherits(Organization, _React$Component);

  function Organization() {
    _classCallCheck(this, Organization);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Organization).apply(this, arguments));
  }

  _createClass(Organization, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'register_organization',
            submitEndpoint: '/api/register/organization',
            submitMethod: 'POST'
          },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'Let\'s start with the parent organization that organizes your unit(s).'
          ),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'p',
            null,
            'This is:'
          ),
          _react2.default.createElement(_components.Radio, {
            label: 'A middle or high school.',
            name: 'is_school',
            value: 'true',
            checked: true
          }),
          _react2.default.createElement(_components.Radio, {
            label: 'A university or independent performance group.',
            name: 'is_school',
            value: 'false'
          }),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'Remember, these should be about your ',
            _react2.default.createElement(
              'strong',
              null,
              'school or independent non-profit'
            ),
            ', not about the competing team itself.'
          ),
          _react2.default.createElement(_components.FormInput, { name: 'name', label: 'Organization Name' }),
          _react2.default.createElement(_components.FormInput, { name: 'street', label: 'Street' }),
          _react2.default.createElement(_components.FormInput, { name: 'city', label: 'City' }),
          _react2.default.createElement(_components.StateSelect, { name: 'state', label: 'State' }),
          _react2.default.createElement(_components.FormInput, { name: 'zip', label: 'ZIP' }),
          _react2.default.createElement(
            'button',
            { name: 'submit', type: 'submit', className: 'btn btn-primary btn-block' },
            'Next'
          )
        )
      );
    }
  }]);

  return Organization;
}(_react2.default.Component);

var _UnitTypes = function (_React$Component2) {
  _inherits(_UnitTypes, _React$Component2);

  function _UnitTypes() {
    _classCallCheck(this, _UnitTypes);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UnitTypes).apply(this, arguments));
  }

  _createClass(_UnitTypes, [{
    key: 'render',
    value: function render() {
      var options = [];
      this.props.contents.map(function (type) {
        options.push(_react2.default.createElement(_components.Radio, {
          label: type.name,
          key: type._id,
          name: 'unit_type',
          value: type._id,
          formStore: 'register_unit'
        }));
      });

      return _react2.default.createElement(
        'div',
        null,
        options
      );
    }
  }]);

  return _UnitTypes;
}(_react2.default.Component);

var Unit = exports.Unit = function (_React$Component3) {
  _inherits(Unit, _React$Component3);

  function Unit() {
    _classCallCheck(this, Unit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unit).apply(this, arguments));
  }

  _createClass(Unit, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'register_unit',
            submitEndpoint: '/api/register/organization/' + this.props.params.org,
            submitMethod: 'POST'
          },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'The information here should be about a competing unit from your school or organization. If you have multiple teams from the same school, please use A/B or JV/Varsity designations to better indicate relative skill levels at a glance. You will be able to provide more creative names to be announced at shows through your Spiel Sheet.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'This unit is:'
          ),
          _react2.default.createElement(_ContentsView2.default, { subStore: 'register_unit_types', endpoint: '/api/unittypes', component: _UnitTypes }),
          _react2.default.createElement(_components.FormInput, { name: 'name', label: 'Unit Name' }),
          _react2.default.createElement(
            'button',
            { name: 'submit', type: 'submit', className: 'btn btn-primary btn-block' },
            'Next'
          )
        )
      );
    }
  }]);

  return Unit;
}(_react2.default.Component);

var _ClassBox = function (_React$Component4) {
  _inherits(_ClassBox, _React$Component4);

  function _ClassBox() {
    _classCallCheck(this, _ClassBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_ClassBox).apply(this, arguments));
  }

  _createClass(_ClassBox, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_components.ClassSelect, {
          name: 'competition_class',
          label: 'Class',
          unitType: this.props.contents.unit_type,
          formStore: 'register_unit_details'
        })
      );
    }
  }]);

  return _ClassBox;
}(_react2.default.Component);

var Details = exports.Details = function (_React$Component5) {
  _inherits(Details, _React$Component5);

  function Details() {
    _classCallCheck(this, Details);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Details).apply(this, arguments));
  }

  _createClass(Details, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'register_unit_details',
            submitEndpoint: '/api/register/unit/' + this.props.params.unit,
            submitMethod: 'POST'
          },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'While most units should compete in the same class they finished last season in, you may choose the class you find most appropriate. Judges will confirm or recommend adjustments at Premiere events.'
          ),
          _react2.default.createElement(_ContentsView2.default, {
            subStore: 'register_classes',
            endpoint: '/api/register/unit/' + this.props.params.unit,
            component: _ClassBox
          }),
          _react2.default.createElement(_components.FormInput, { name: 'members', label: 'Members' }),
          _react2.default.createElement(
            'button',
            { name: 'submit', type: 'submit', className: 'btn btn-primary btn-block' },
            'Next'
          )
        )
      );
    }
  }]);

  return Details;
}(_react2.default.Component);

var _EventBox = function (_React$Component6) {
  _inherits(_EventBox, _React$Component6);

  function _EventBox() {
    _classCallCheck(this, _EventBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_EventBox).apply(this, arguments));
  }

  _createClass(_EventBox, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_components.EventChecks, {
        formStore: 'register_unit_events',
        endpoint: '/api/events/by_type/' + this.props.contents.unit_type
      });
    }
  }]);

  return _EventBox;
}(_react2.default.Component);

var EventRegistration = exports.EventRegistration = function (_React$Component7) {
  _inherits(EventRegistration, _React$Component7);

  function EventRegistration() {
    _classCallCheck(this, EventRegistration);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EventRegistration).apply(this, arguments));
  }

  _createClass(EventRegistration, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'register_unit_events',
          fetchEndpoint: '/api/units/' + this.props.params.unit + '/events',
          submitEndpoint: '/api/register/unit/' + this.props.params.unit + '/events',
          submitMethod: 'POST'
        },
        _react2.default.createElement(
          'p',
          { className: 'lead' },
          'If you know which events you\'d like to attend, you may select them now. Event registrations are editable until the Monday two weeks prior to the event\'s date.'
        ),
        _react2.default.createElement(_ContentsView2.default, {
          subStore: 'register_unit_events',
          endpoint: '/api/register/unit/' + this.props.params.unit,
          component: _EventBox
        }),
        _react2.default.createElement(
          'button',
          { name: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
          'Register Unit'
        )
      );
    }
  }]);

  return EventRegistration;
}(_react2.default.Component);

var _Confirmation = function (_React$Component8) {
  _inherits(_Confirmation, _React$Component8);

  function _Confirmation() {
    _classCallCheck(this, _Confirmation);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Confirmation).apply(this, arguments));
  }

  _createClass(_Confirmation, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-12 col-sm-6' },
          _react2.default.createElement(
            'div',
            { className: 'card card-block' },
            _react2.default.createElement(
              'p',
              { className: 'card-text' },
              'This school or organization has more units.'
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              {
                to: '/register/organization/' + this.props.contents.organization,
                className: 'btn btn-block btn-primary'
              },
              'Register Another Unit'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-12 col-sm-6 d' },
          _react2.default.createElement(
            'div',
            { className: 'card card-block' },
            _react2.default.createElement(
              'p',
              { className: 'card-text' },
              'I represent an additional organization or school.'
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/register', className: 'btn btn-block btn-warning' },
              'Register Another Organization'
            )
          )
        )
      );
    }
  }]);

  return _Confirmation;
}(_react2.default.Component);

var Confirm = exports.Confirm = function (_React$Component9) {
  _inherits(Confirm, _React$Component9);

  function Confirm() {
    _classCallCheck(this, Confirm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Confirm).apply(this, arguments));
  }

  _createClass(Confirm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            'You\'re all set.'
          )
        ),
        _react2.default.createElement(_ContentsView2.default, {
          subStore: 'register_confirmation',
          endpoint: '/api/register/unit/' + this.props.params.unit + '/confirm',
          component: _Confirmation
        }),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-offset-1 col-xs-10 text-xs-center' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/', className: 'btn btn-success-outline btn-block btn-sm' },
                'Return to Dashboard'
              )
            )
          )
        )
      );
    }
  }]);

  return Confirm;
}(_react2.default.Component);