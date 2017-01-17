'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateForm;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateForm() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var rules = {
    'name': 'required',
    'description': 'required'
  };

  var messages = {
    'required': 'This field is required.'
  };

  return _indicative2.default.validateAll(data, rules, messages);
}
module.exports = exports['default'];