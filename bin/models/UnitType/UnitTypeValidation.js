'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateUnitType;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateUnitType() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var rules = {
    'name': 'required'
  };

  var messages = {
    'required': 'This field is required.'
  };

  if (!data.slug) {
    data.slug = _indicative2.default.sanitizor.slug(data.name);
  }

  return _indicative2.default.validateAll(data, rules, messages);
}
module.exports = exports['default'];