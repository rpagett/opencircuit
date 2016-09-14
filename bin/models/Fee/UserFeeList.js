'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserFeeList = function (_React$Component) {
  _inherits(UserFeeList, _React$Component);

  function UserFeeList() {
    _classCallCheck(this, UserFeeList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserFeeList).apply(this, arguments));
  }

  _createClass(UserFeeList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'userFeeList',
          endpoint: this.props.endpoint,
          emptyMessage: 'You owe no fees.',
          columns: {
            'Unit': function Unit(fee) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: fee.unit.detailsUrl },
                fee.unit.name
              );
            },
            'Amount': function Amount(fee) {
              return '$' + fee.amount;
            },
            'Due': function Due(fee) {
              return fee.formattedDueDate;
            },
            'Category': function Category(fee) {
              return fee.category.name;
            },
            'Amount Paid': function AmountPaid(fee) {
              return '$' + _lodash2.default.sumBy(fee.payments, 'amount');
            }
          }
        })
      );
    }
  }]);

  return UserFeeList;
}(_react2.default.Component);

exports.default = UserFeeList;
;
module.exports = exports['default'];