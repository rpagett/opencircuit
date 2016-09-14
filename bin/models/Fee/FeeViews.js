'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Invoice = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _ContentsView = require('../../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

var _FeeList = require('./FeeList');

var _FeeList2 = _interopRequireDefault(_FeeList);

var _SpawnableModal = require('../../modals/SpawnableModal');

var _logos = require('../../helpers/logos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FeeCategories = function (_React$Component) {
  _inherits(_FeeCategories, _React$Component);

  function _FeeCategories() {
    _classCallCheck(this, _FeeCategories);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_FeeCategories).apply(this, arguments));
  }

  _createClass(_FeeCategories, [{
    key: 'render',
    value: function render() {
      var names = _lodash2.default.map(this.props.contents, 'name');
      var pills = [];

      names.map(function (name) {
        pills.push(_react2.default.createElement(
          'span',
          { className: 'tag tag-pill tag-info', key: name },
          name
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'strong',
            null,
            'Fee Categories: '
          ),
          pills
        )
      );
    }
  }]);

  return _FeeCategories;
}(_react2.default.Component);

var Index = exports.Index = function (_React$Component2) {
  _inherits(Index, _React$Component2);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
  }

  _createClass(Index, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Fees'
        ),
        _react2.default.createElement(_FeeList2.default, { endpoint: '/api/fees' }),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 offset-sm-1 col-sm-10' },
            _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
              className: 'btn btn-sm btn-block btn-outline-danger',
              buttonText: 'Assess Fee',

              title: 'Assess Fee',
              componentName: 'FEE_ASSESS_FEE',
              modalProps: {
                refreshTable: 'feeList',
                refreshEndpoint: '/api/fees'
              }
            })
          )
        ),
        _react2.default.createElement('p', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_ContentsView2.default, {
            subStore: 'fee_categories',
            endpoint: '/api/feecategories',
            component: _FeeCategories
          })
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var _Invoice = function (_React$Component3) {
  _inherits(_Invoice, _React$Component3);

  function _Invoice() {
    _classCallCheck(this, _Invoice);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Invoice).apply(this, arguments));
  }

  _createClass(_Invoice, [{
    key: 'render',
    value: function render() {
      var rows = [];
      var total = 0;
      this.props.contents.fees.map(function (fee) {
        var amountPaid = 0;

        for (var key in fee.payments) {
          amountPaid += fee.payments[key].amount;
        }

        total += fee.amount - amountPaid;
        rows.push(_react2.default.createElement(
          'div',
          { className: 'row', key: fee._id },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3', key: fee._id + '-name' },
            fee.unit.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-2', key: fee._id + '-assessed' },
            fee.formattedAssessedDate
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-2', key: fee._id + '-due' },
            fee.formattedDueDate
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-2', key: fee._id + '-notes' },
            fee.notes ? fee.notes : fee.category.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3 text-xs-right', key: fee._id + '-AR' },
            '$',
            fee.amountRemaining
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid invoice-container col-xs-12' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 invoice-header' },
            'Account Invoice'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row invoice-address' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement(_logos.CircuitLogo, { className: 'circuit-logo' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'offset-xs-4 col-xs-4 text-xs-right' },
            _react2.default.createElement(
              'strong',
              null,
              'CWEA'
            ),
            _react2.default.createElement('br', null),
            'Attn: Accounts Receivable',
            _react2.default.createElement('br', null),
            'PO Box 3614',
            _react2.default.createElement('br', null),
            'Rock Hill, SC 29732'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'card card-block offset-xs-1 col-xs-10' },
            _react2.default.createElement(
              'div',
              { className: 'card-header black' },
              'Outstanding Fees for ',
              this.props.contents.orgName
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-block' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-3' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Unit Name'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-2' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Assessed'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-2' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Due'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-2' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Notes'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-3 text-xs-right' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Amount Due'
                  )
                )
              ),
              rows
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-footer text-xs-right' },
              _react2.default.createElement(
                'strong',
                null,
                'Total: $',
                total
              )
            )
          )
        ),
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
            { className: 'text-xs-center m-x-auto app-plug' },
            'invoicing powered by'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'm-x-auto' },
            _react2.default.createElement('img', { src: '/assets/img/2016NavbarLogo.png', alt: 'OpenCircuit', 'aria-hidden': 'true' })
          )
        )
      );
    }
  }]);

  return _Invoice;
}(_react2.default.Component);

var Invoice = exports.Invoice = function (_React$Component4) {
  _inherits(Invoice, _React$Component4);

  function Invoice() {
    _classCallCheck(this, Invoice);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Invoice).apply(this, arguments));
  }

  _createClass(Invoice, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentsView2.default, {
        subStore: 'fee_invoice',
        endpoint: '/api/fees/invoice/' + this.props.params.org,
        component: _Invoice
      });
    }
  }]);

  return Invoice;
}(_react2.default.Component);