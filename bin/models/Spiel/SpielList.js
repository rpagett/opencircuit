'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = require('react-router');

var _UserRoles = require('../User/UserRoles');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpielList = function (_React$Component) {
  _inherits(SpielList, _React$Component);

  function SpielList() {
    _classCallCheck(this, SpielList);

    return _possibleConstructorReturn(this, (SpielList.__proto__ || Object.getPrototypeOf(SpielList)).apply(this, arguments));
  }

  _createClass(SpielList, [{
    key: 'canEdit',
    value: function canEdit(unit, user) {
      return '/spiels/' + unit.slug;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'spielList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no units.',
          columns: {
            'Name': function Name(unit) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: unit.detailsUrl },
                unit.name
              );
            },
            'Show Title': function ShowTitle(unit) {
              return unit.spiel ? unit.spiel.show_title : 'No spiel';
            },
            'Last Revision': function LastRevision(unit) {
              return unit.spiel ? (0, _moment2.default)(unit.spiel.updatedAt).format('MMM. Do, YYYY [at] h:mm a') : 'N/A';
            }
          },
          fedContents: this.props.units,
          canEdit: this.canEdit,
          canDelete: null,
          deriveName: function deriveName(unit) {
            return unit.name;
          }
        })
      );
    }
  }]);

  return SpielList;
}(_react2.default.Component);

exports.default = SpielList;
;
module.exports = exports['default'];