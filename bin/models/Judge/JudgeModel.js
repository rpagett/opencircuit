'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var JudgeSchema = new _mongoose2.default.Schema({
  email: String,

  first_name: String,
  middle_initial: String,
  last_name: String,
  dob: String,
  gender: String,

  phone: String,
  street: String,
  address_2: String,
  city: String,
  state: String,
  zip: String,

  ff_airline: String,
  ff_number: String,
  airport: String,
  TSA_precheck: String,
  friday_departure: String,
  sunday_departure: String,
  bio: String,
  dietary_needs: String,
  comments: String,

  self_edit_hash: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

JudgeSchema.virtual('formattedName').get(function () {
  return this.first_name + ' ' + (this.middle_initial ? this.middle_initial + '. ' : '') + this.last_name;
});

JudgeSchema.virtual('profileUrl').get(function () {
  return '/judges/' + this.email;
});

exports.default = _mongoose2.default.model('Judge', JudgeSchema);
module.exports = exports['default'];