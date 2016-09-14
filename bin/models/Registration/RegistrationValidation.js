'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organization = organization;
exports.unit = unit;
exports.unitDetails = unitDetails;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function organization() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'is_school': 'required',
    'name': 'required',
    'street': 'required',
    'city': 'required',
    'state': 'required',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  var messages = {
    'required': 'This field is required.',
    'zip.regex': 'Please supply a 5-digit ZIP code.'
  };

  if (!data.slug) {
    data.slug = _indicative2.default.sanitizor.slug(data.name);
  }

  return _indicative2.default.validateAll(data, rules, messages);
}

function unit() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'unit_type': 'required',
    'name': 'required',
    'is_member': 'required'
  };

  var messages = {
    'required': 'This field is required.'
  };

  if (!data.slug) {
    data.slug = _indicative2.default.sanitizor.slug(data.name);
  }

  return _indicative2.default.validateAll(data, rules, messages);
}

function unitDetails() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var rules = {
    'competition_class': 'required'
  };

  var messages = {
    'required': 'This field is required.'
  };

  return _indicative2.default.validateAll(data, rules, messages);
}