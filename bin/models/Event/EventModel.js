'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventSchema = new _mongoose2.default.Schema({
  slug: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  image_url: String,
  facebook_url: String,
  date: Date,
  registration_autoclose: Date,
  attendance_cap: Number,
  registration_closed: Boolean,
  critique_closed: Boolean,

  notes: String, //EventDirector+

  // Ticket Prices
  adult_ticket_price: Number,
  youth_ticket_price: Number
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

EventSchema.virtual('detailsUrl').get(function () {
  return '/events/' + this.slug;
});

EventSchema.virtual('formattedDate').get(function () {
  return (0, _moment2.default)(this.date).format('MMM. Do, YYYY [at] h:mm a');
});

EventSchema.statics.fillableFields = function () {
  return ['name', 'slug', 'facebook_url', 'date', 'registration_autoclose', 'attendance_cap', 'registration_closed', 'critique_closed', 'notes', 'adult_ticket_price', 'youth_ticket_price'];
};

exports.default = _mongoose2.default.model('Event', EventSchema);