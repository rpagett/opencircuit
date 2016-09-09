'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePayment = validatePayment;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validatePayment() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'amount': 'required',
    'payment_type': 'required'
  };

  var messages = {
    'required': 'This field is required.'
  };

  return _indicative2.default.validateAll(data, rules, messages);
}