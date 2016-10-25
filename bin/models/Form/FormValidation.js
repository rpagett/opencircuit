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
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'file': 'required',
    'name': ['required', 'regex:^[a-zA-Z.\s]+$'],
    'description': 'required'
  };

  var sanitation = {
    'name': 'capitalize'
  };

  var messages = {
    'required': 'This field is required.',
    'name.regex': 'The name may only contain letters and spaces.'
  };

  return _indicative2.default.validateAll(data, rules, messages).then(function (data) {
    return _indicative2.default.sanitize(data, sanitation);
  });
}
module.exports = exports['default'];