'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payments = exports.GenerateInvoice = exports.AssessFee = exports.UserPayment = exports.AdminPayment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ContentsView = require('../../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

var _components = require('../../forms/components');

var _PaymentTypes = require('./PaymentTypes');

var _PaymentTypes2 = _interopRequireDefault(_PaymentTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminPayment = exports.AdminPayment = function (_React$Component) {
  _inherits(AdminPayment, _React$Component);

  function AdminPayment() {
    _classCallCheck(this, AdminPayment);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AdminPayment).apply(this, arguments));
  }

  _createClass(AdminPayment, [{
    key: 'render',
    value: function render() {
      var fee = this.props.fee;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'fee_admin_payment',
            submitEndpoint: '/api/fees/' + fee._id + '/applyPayment',
            submitMethod: 'POST',
            inModal: true
          },
          _react2.default.createElement(_components.FormInput, { name: 'amount', label: 'Amount to Apply', beforeInput: '$' }),
          _react2.default.createElement(_components.PaymentTypeSelect, { name: 'payment_type', label: 'Payment Type' }),
          _react2.default.createElement(
            'button',
            { name: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
            'Apply Payment'
          )
        )
      );
    }
  }]);

  return AdminPayment;
}(_react2.default.Component);

var _UserPayment = function (_React$Component2) {
  _inherits(_UserPayment, _React$Component2);

  function _UserPayment() {
    _classCallCheck(this, _UserPayment);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UserPayment).apply(this, arguments));
  }

  _createClass(_UserPayment, [{
    key: 'render',
    value: function render() {
      var boxes = [];
      this.props.contents.map(function (fee) {
        boxes.push(_react2.default.createElement(_components.Checkbox, { name: 'fees', label: fee.unit.name + ' - $' + fee.amountRemaining, value: fee._id, key: fee._id }));
      });

      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'fee_userPay',
          submitEndpoint: '/api/fees/userPay',
          submitMethod: 'POST'
        },
        boxes,
        _react2.default.createElement(
          'button',
          { type: 'submit', role: 'submit', name: 'submit', className: 'btn btn-block btn-primary' },
          'Proceed to Paypal'
        )
      );
    }
  }]);

  return _UserPayment;
}(_react2.default.Component);

var UserPayment = exports.UserPayment = function (_React$Component3) {
  _inherits(UserPayment, _React$Component3);

  function UserPayment() {
    _classCallCheck(this, UserPayment);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserPayment).apply(this, arguments));
  }

  _createClass(UserPayment, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'fee_userPay',
        endpoint: '/api/fees/forUser/' + this.props.user._id,
        component: _UserPayment
      });
    }
  }]);

  return UserPayment;
}(_react2.default.Component);

var AssessFee = exports.AssessFee = function (_React$Component4) {
  _inherits(AssessFee, _React$Component4);

  function AssessFee() {
    _classCallCheck(this, AssessFee);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AssessFee).apply(this, arguments));
  }

  _createClass(AssessFee, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'fee_assess',
          submitEndpoint: '/api/fees/',
          submitMethod: 'POST',
          inModal: true
        },
        _react2.default.createElement(_components.UnitSelect, { name: 'unit', label: 'Unit' }),
        _react2.default.createElement(_components.FormInput, { name: 'amount', label: 'Amount' }),
        _react2.default.createElement(_components.FeeCategorySelect, { name: 'category', label: 'Fee Category' }),
        _react2.default.createElement(_components.DateTime, { name: 'due_date', label: 'Due' }),
        _react2.default.createElement(_components.TextArea, { name: 'notes', label: 'Notes' }),
        _react2.default.createElement(
          'button',
          { name: 'submit', type: 'submit', className: 'btn btn-danger btn-block' },
          'Assess Fee'
        )
      );
    }
  }]);

  return AssessFee;
}(_react2.default.Component);

var GenerateInvoice = exports.GenerateInvoice = function (_React$Component5) {
  _inherits(GenerateInvoice, _React$Component5);

  function GenerateInvoice() {
    _classCallCheck(this, GenerateInvoice);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GenerateInvoice).apply(this, arguments));
  }

  _createClass(GenerateInvoice, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      var buttons = [];
      this.props.orgs.map(function (org) {
        buttons.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12', key: org._id },
            _react2.default.createElement(
              _reactRouter.Link,
              {
                onClick: _this6.props.markClosed,
                role: 'button',
                className: 'btn btn-primary btn-block',
                to: '/invoice/' + org._id
              },
              org.name
            )
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Select the organization to invoice.'
        ),
        buttons
      );
    }
  }]);

  return GenerateInvoice;
}(_react2.default.Component);

var Payments = exports.Payments = function (_React$Component6) {
  _inherits(Payments, _React$Component6);

  function Payments() {
    _classCallCheck(this, Payments);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Payments).apply(this, arguments));
  }

  _createClass(Payments, [{
    key: 'render',
    value: function render() {
      var lines = [];

      this.props.payments.map(function (payment) {
        lines.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6' },
            '$',
            payment.amount
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6' },
            _PaymentTypes2.default[payment.method]
          )
        ));
      });
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6' },
            _react2.default.createElement(
              'strong',
              null,
              'Amount'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6' },
            _react2.default.createElement(
              'strong',
              null,
              'Method'
            )
          )
        ),
        lines
      );
    }
  }]);

  return Payments;
}(_react2.default.Component);