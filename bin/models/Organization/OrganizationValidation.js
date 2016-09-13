'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateOrganization;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateOrganization() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'name': 'required',
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$'],
    'director': 'required'
  };

  var messages = {
    'required': 'This field is required.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  data.name = data.name.replace(/middle school/i, 'MS');
  data.name = data.name.replace(/high school/i, 'HS');

  if (!data.slug) {
    data.slug = _indicative2.default.sanitizor.slug(data.name);
  }

  return _indicative2.default.validateAll(data, rules, messages);
}
module.exports = exports['default'];