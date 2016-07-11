'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateEvent;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateEvent() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'name': 'required',
    'date': 'required'
  };

  var messages = {
    'required': 'This field is required.'
  };

  if (!data.slug) {
    data.slug = _indicative2.default.sanitizor.slug(data.name);
  }

  return _indicative2.default.validateAll(data, rules, messages);
}