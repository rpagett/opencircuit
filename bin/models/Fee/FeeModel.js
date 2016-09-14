'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var PaymentSchema = new _mongoose2.default.Schema({
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

var FeeSchema = new _mongoose2.default.Schema({
  unit: {
    type: ObjectId,
    ref: 'Unit'
  },
  category: {
    type: ObjectId,
    ref: 'FeeCategory'
  },
  payments: [PaymentSchema],

  amount: Number,
  assessed_date: Date,
  due_date: Date,
  paid_date: Date,
  paypal_id: String
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

FeeSchema.statics.NON_MEMBER_FEE = function () {
  return 175;
};

FeeSchema.statics.PLUS_PASS_FEE = function () {
  return 100;
};

FeeSchema.statics.DUE_DATE = function () {
  return Date.parse('Dec 31, 2016');
};

FeeSchema.virtual('formattedAssessedDate').get(function () {
  return (0, _moment2.default)(this.created_at).format('MMM. Do, YYYY');
});

FeeSchema.virtual('formattedPaidDate').get(function () {
  return (0, _moment2.default)(this.paid_date).format('MMM. Do, YYYY');
});

FeeSchema.virtual('formattedDueDate').get(function () {
  return (0, _moment2.default)(this.due_date).format('MMM. Do, YYYY');
});

FeeSchema.virtual('amountRemaining').get(function () {
  return this.amount - _lodash2.default.sumBy(this.payments, 'amount');
});

exports.default = _mongoose2.default.model('Fee', FeeSchema);
module.exports = exports['default'];