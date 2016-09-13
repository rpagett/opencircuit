'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

var _ModalActions = require('../../modals/ModalActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompClassList = function (_React$Component) {
  _inherits(CompClassList, _React$Component);

  function CompClassList() {
    _classCallCheck(this, CompClassList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CompClassList).apply(this, arguments));
  }

  _createClass(CompClassList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'compClassList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no competitive classes.',
          columns: {
            'Name': function Name(compclass) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: compclass.detailsUrl },
                compclass.name
              );
            },
            'Abbreviation': function Abbreviation(compclass) {
              return compclass.abbreviation.toUpperCase();
            },
            'Unit Type': function UnitType(compclass) {
              return compclass.unit_type.name;
            },
            'Unit Count': function UnitCount(compclass) {
              return compclass.unitCount;
            }
          }
        })
      );
    }
  }]);

  return CompClassList;
}(_react2.default.Component);

exports.default = CompClassList;
;
module.exports = exports['default'];