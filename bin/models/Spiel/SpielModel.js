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

var SpielSchema = new _mongoose2.default.Schema({
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

exports.default = SpielSchema;
module.exports = exports['default'];