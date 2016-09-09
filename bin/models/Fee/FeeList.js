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

var _FlexTable = require('../../helpers/flexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

var _SpawnableModal = require('../../modals/SpawnableModal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeeList = function (_React$Component) {
  _inherits(FeeList, _React$Component);

  function FeeList() {
    _classCallCheck(this, FeeList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FeeList).apply(this, arguments));
  }

  _createClass(FeeList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'feeList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no fees.',
          columns: {
            'Unit': function Unit(fee) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { to: fee.unit.detailsLink },
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
            },
            'Date Paid': function DatePaid(fee) {
              if (fee.paid_date) {
                return _react2.default.createElement(
                  'div',
                  null,
                  fee.formattedPaidDate
                );
              }

              return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                  className: 'btn btn-sm btn-outline-success',
                  buttonText: 'Apply Payment',

                  title: 'Apply Payment',
                  componentName: 'FEE_APPLY_PAYMENT',
                  modalProps: {
                    fee: fee,
                    refreshTable: 'feeList',
                    refreshEndpoint: _this2.props.endpoint
                  }
                })
              );
            }
          }
        })
      );
    }
  }]);

  return FeeList;
}(_react2.default.Component);

exports.default = FeeList;
;