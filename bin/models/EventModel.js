'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventSchema = new _mongoose2.default.Schema({
  shortname: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  date: Date,
  start_time: {
    type: Date,
    default: Date.now
  },

  street: String,
  city: String,
  state: String,
  zip: Number,

  attendance_cap: Number,
  registration_open: {
    type: Boolean,
    default: true
  },
  critique_open: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('Event', EventSchema);