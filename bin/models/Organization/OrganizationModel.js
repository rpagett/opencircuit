'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UserModel = require('../User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

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
  ZIP: String,

  is_school: Boolean,

  director: {
    type: ObjectId,
    ref: _UserModel2.default
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

OrganizationSchema.virtual('detailsUrl').get(function () {
  return '/organizations/' + this.slug;
});

exports.default = _mongoose2.default.model('Organization', OrganizationSchema);