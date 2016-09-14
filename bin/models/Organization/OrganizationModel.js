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
var OrganizationSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },

  street: String,
  street_2: String,
  city: String,
  state: String,
  zip: String,

  is_school: Boolean,

  director: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

OrganizationSchema.plugin(_mongooseLifecycle2.default);

OrganizationSchema.virtual('detailsUrl').get(function () {
  return '/organizations/' + this.slug;
});

exports.default = _mongoose2.default.model('Organization', OrganizationSchema);
module.exports = exports['default'];