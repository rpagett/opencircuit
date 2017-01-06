'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseLifecycle = require('mongoose-lifecycle');

var _mongooseLifecycle2 = _interopRequireDefault(_mongooseLifecycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var EventRegistrationSchema = new _mongoose2.default.Schema({
  unit: {
    type: ObjectId,
    ref: 'Unit'
  },
  event: {
    type: ObjectId,
    ref: 'Event'
  },
  competition_class: {
    type: ObjectId,
    ref: 'CompClass'
  },

  performance_time: String,
  exhibition: Boolean,
  attending_critique: Boolean,

  score: Number
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

EventRegistrationSchema.plugin(_mongooseLifecycle2.default);

exports.default = _mongoose2.default.model('EventRegistration', EventRegistrationSchema);
module.exports = exports['default'];