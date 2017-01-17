'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SpawnableModal = require('../../modals/SpawnableModal');

var _UserRoles = require('../User/UserRoles');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnitEventsList = function (_React$Component) {
  _inherits(UnitEventsList, _React$Component);

  function UnitEventsList() {
    _classCallCheck(this, UnitEventsList);

    return _possibleConstructorReturn(this, (UnitEventsList.__proto__ || Object.getPrototypeOf(UnitEventsList)).apply(this, arguments));
  }

  _createClass(UnitEventsList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'unitEventsList',
          endpoint: this.props.endpoint,
          emptyMessage: 'This unit is currently not registered for any events.',
          columns: {
            'Name': function Name(reg) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { key: reg.found._id + '-name', to: reg.detailsUrl },
                reg.name
              );
            },
            'Date': function Date(reg) {
              return reg.formattedDate;
            },
            'Class': function Class(reg) {
              return reg.competition_class;
            },
            'Status': function Status(reg) {
              return reg.status;
            },
            'Critique': function Critique(reg) {
              if (reg.critique_closed) {
                if (reg.found.attending_critique) {
                  return _react2.default.createElement(
                    'i',
                    { key: reg.found._id + '-critique' },
                    'Attending Critique'
                  );
                }

                return _react2.default.createElement(
                  'i',
                  { key: reg.found._id + '-critique' },
                  'Registration Closed'
                );
              }

              if (reg.found.attending_critique) {
                return _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                  className: 'btn btn-block btn-sm btn-success',
                  buttonText: 'Registered',
                  key: reg.found._id + '-critique',

                  title: 'Remove Critique Registration?',
                  componentName: 'UNIT_CRITIQUE_REMOVE',
                  modalProps: {
                    event: reg,
                    reg: reg.found,
                    refreshTable: 'unitEventsList',
                    refreshEndpoint: _this2.props.endpoint
                  }
                });
              }

              return _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                className: 'btn btn-block btn-sm btn-warning',
                buttonText: 'Register?',
                key: reg.found._id + '-critique',

                title: 'Register for Critique?',
                componentName: 'UNIT_CRITIQUE_REGISTER',
                modalProps: {
                  event: reg,
                  reg: reg.found,
                  refreshTable: 'unitEventsList',
                  refreshEndpoint: _this2.props.endpoint

                }
              });
            }
          }
        })
      );
    }
  }]);

  return UnitEventsList;
}(_react2.default.Component);

exports.default = UnitEventsList;
;
module.exports = exports['default'];