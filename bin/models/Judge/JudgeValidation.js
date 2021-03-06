'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateJudge;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateJudge() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var rules = {
    'email': 'required|email',
    'first_name': ['required', 'regex:^[a-zA-Z.\s]+$'],
    'middle_initial': 'max:1',
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

  if (data.middle_initial) {
    sanitation['middle_initial'] = 'capitalize';
  }

  if (data.dob) {
    data.dob = (0, _moment2.default)(data.dob).format('MMM. Do, YYYY');
  }

  if (!data.friday_departure) {
    data.friday_departure = 0;
  }
  if (!data.sunday_departure) {
    data.sunday_departure = 0;
  }

  var messages = {
    'required': 'This field is required.',
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