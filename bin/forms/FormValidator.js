'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formValidator;

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

var _reduxForm = require('redux-form');

var _functions = require('../helpers/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formValidator(data, rules, messages) {
  _indicative2.default.validate(data, rules, messages).then(function () {
    return {
      success: true
    };
  }).catch(function (errors) {
    var formErrors = (0, _functions.translateValidationErrors)(errors);
    console.log('Errors in form validation', formErrors);
    throw new _reduxForm.SubmissionError(formErrors);
  });
}