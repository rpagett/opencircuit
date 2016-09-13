'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateUser;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateUser() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'email': 'required|email',
    'password': 'required_if:password_verify',
    'password_verify': 'required_if:password|same:password',
    'first_name': ['required', 'regex:^[a-zA-Z.\s]+$'],
    'mi': 'max:1',
    'last_name': ['required', 'regex:^[a-zA-Z\-\s]+$'],
    'phone': ['required', 'min:10', 'max:16', 'regex:^[^_]+$'],
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  var sanitation = {
    'first_name': 'capitalize',
    'last_name': 'title',
    'city': 'title'
  };

  if (data.mi) {
    sanitation['mi'] = 'capitalize';
  }

  var messages = {
    'required': 'This field is required.',
    'required_if': 'This field is required.',
    'password_verify.same': 'The passwords must match.',
    'first_name.regex': 'Your first name may only contain letters and spaces.',
    'last_name.regex': 'Your last name may only contain letters, spaces, and dashes.',
    'phone.regex': 'Phone numbers must follow a (555) 555 - 5555 format.',
    'phone.min': 'Phone numbers must follow a (555) 555 - 5555 format.',
    'phone.max': 'Phone numbers must follow a (555) 555 - 5555 format.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  return _indicative2.default.validateAll(data, rules, messages).then(function (data) {
    return _indicative2.default.sanitize(data, sanitation);
  });
}
module.exports = exports['default'];