'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateCompClass;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateCompClass() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'name': 'required',
    'abbreviation': 'required|alpha'
  };

  var messages = {
    'required': 'This field is required.'
  };

  data.abbreviation = data.abbreviation.toLowerCase();

  return _indicative2.default.validateAll(data, rules, messages);
}