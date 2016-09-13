'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateUnit;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateUnit() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'name': 'required',
    'members': 'integer|min:5'
  };

  var messages = {
    'required': 'This field is required.'
  };

  if (!data.slug) {
    data.slug = _indicative2.default.sanitizor.slug(data.name);
  }

  data.name = data.name.replace(/middle school/i, 'MS');
  data.name = data.name.replace(/high school/i, 'HS');

  return _indicative2.default.validateAll(data, rules, messages);
}
module.exports = exports['default'];