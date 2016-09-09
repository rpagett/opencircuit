'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var PaymentSchema = new _mongoose2.default.Schema({
  fee: {
    type: ObjectId,
    ref: 'Fee'
  },
  amount: Number,
  method: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

exports.default = _mongoose2.default.model('Payment', PaymentSchema);