'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = exports.Show = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _functions = require('../../helpers/functions');

var _SpawnableModal = require('../../modals/SpawnableModal');

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _ModelInfo = require('../../layout/ModelInfo');

var _UserRoles = require('../User/UserRoles');

var _UnitForms = require('./UnitForms');

var UnitForms = _interopRequireWildcard(_UnitForms);

var _UnitList = require('./UnitList');

var _UnitList2 = _interopRequireDefault(_UnitList);

var _UnitMusicList = require('./UnitMusicList');

var _UnitMusicList2 = _interopRequireDefault(_UnitMusicList);

var _UserFeeList = require('../Fee/UserFeeList');

var _UserFeeList2 = _interopRequireDefault(_UserFeeList);

var _UnitEventsList = require('../Event/UnitEventsList');

var _UnitEventsList2 = _interopRequireDefault(_UnitEventsList);

var _FormObligationList = require('../Form/FormObligationList');

var _FormObligationList2 = _interopRequireDefault(_FormObligationList);

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
          'Units'
        ),
        _react2.default.createElement(_UnitList2.default, { endpoint: '/api/units' })
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

//class _AttendingEvents extends React.Component {
//  render() {
//    return (
//
//    )
//  }
//}

var _Show = function (_React$Component2) {
  _inherits(_Show, _React$Component2);

  function _Show() {
    _classCallCheck(this, _Show);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Show).apply(this, arguments));
  }

  _createClass(_Show, [{
    key: 'musicBox',
    value: function musicBox(unit, user) {
      if (unit.unit_type.slug != 'guard') {
        return null;
      }

      if ((0, _UserRoles.userHasRole)(user, _UserRoles.UserRoles.Administrator) || unit.director._id.equals(user._id)) {
        return _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'card col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'card-header card-info' },
              'Music'
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-block' },
              _react2.default.createElement(_UnitMusicList2.default, { units: [unit], user: this.props.authUser })
            )
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var unit = this.props.model;

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid model-info' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          unit.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Organization'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: unit.organization.detailsUrl },
              unit.organization.name
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Director'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: unit.director.profileUrl },
              unit.director.formattedName
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Unit Type'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            unit.unit_type.name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Class'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            unit.competition_class ? unit.competition_class.formattedName : 'none',
            _react2.default.createElement(
              _UserRoles.HasRole,
              { role: _UserRoles.UserRoles.Administrator },
              _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                className: 'btn btn-link',
                buttonText: 'Reclassify',

                title: 'Reclassify Unit',
                componentName: 'UNIT_RECLASSIFY',
                modalProps: {
                  unit: unit,
                  refreshTable: 'unitEventsList',
                  refreshEndpoint: '/api/units/' + unit.slug + '/attending'
                }
              })
            )
          )
        ),
        unit.members ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Member Count'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            unit.members
          )
        ) : null,
        unit.notes ? _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.EventDirector, className: 'row' },
          _react2.default.createElement(
            _ModelInfo.Prop,
            null,
            'Notes'
          ),
          _react2.default.createElement(
            _ModelInfo.Val,
            null,
            unit.notes
          )
        ) : null,
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'card col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'card-header card-info' },
              'Event Registrations'
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-block' },
              _react2.default.createElement(_UnitEventsList2.default, { endpoint: '/api/units/' + unit.slug + '/attending' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'card col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'card-header card-info' },
              'Fees and Payments'
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-block' },
              _react2.default.createElement(_UserFeeList2.default, { endpoint: '/api/fees/forUnit/' + unit.slug })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'card col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'card-header card-info' },
              'Forms'
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-block' },
              _react2.default.createElement(_FormObligationList2.default, { endpoint: '/api/forms/forUnit/' + unit._id })
            )
          )
        ),
        this.musicBox(unit, this.props.authUser),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.Administrator, className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'pull-xs-center col-xs-12 offset-sm-4 col-sm-4' },
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/units/' + unit.slug + '/edit', className: 'btn btn-sm btn-outline-secondary btn-block' },
              'Edit Unit'
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
      return _react2.default.createElement(_ModelView2.default, {
        subStore: 'unit_show',
        endpoint: '/api/units/' + this.props.params.slug,
        component: (0, _functions.authConnect)(_Show)
      });
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
          'Editing Unit'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-1 col-sm-10' },
            _react2.default.createElement(UnitForms.Edit, { slug: this.props.params.slug })
          )
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);