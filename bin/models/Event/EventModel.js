'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventSchema = new _mongoose2.default.Schema({
  slug: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  date: Date,
  start_time: String,
  attendance_cap: Number,
  registration_open: Boolean,
  critique_open: Boolean
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

exports.default = _mongoose2.default.model('Event', EventSchema);