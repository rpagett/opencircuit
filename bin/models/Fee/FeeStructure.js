'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = determineFeeStructure;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeeStructure = [475, 425, 400, 375, 350];

function determineFeeStructure(count) {
  if (FeeStructure[count - 1]) {
    return FeeStructure[count - 1];
  }

  return _lodash2.default.last(FeeStructure);
}
module.exports = exports['default'];