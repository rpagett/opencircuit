'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongooseLifecycle = require('mongoose-lifecycle');

var _mongooseLifecycle2 = _interopRequireDefault(_mongooseLifecycle);

var _UnitTypeModel = require('../UnitType/UnitTypeModel');

var _UnitTypeModel2 = _interopRequireDefault(_UnitTypeModel);

var _CompClassModel = require('../CompClass/CompClassModel');

var _CompClassModel2 = _interopRequireDefault(_CompClassModel);

var _UserModel = require('../User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _OrganizationModel = require('../Organization/OrganizationModel');

var _OrganizationModel2 = _interopRequireDefault(_OrganizationModel);

var _FormModel = require('../Form/FormModel');

var _SpielSchema = require('../Spiel/SpielSchema');

var _SpielSchema2 = _interopRequireDefault(_SpielSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var UnitSchema = _mongoose2.default.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  members: Number,
  image_url: String,
  notes: String,

  circuit_member: Boolean,
  plus_pass: Boolean,
  confirmed_paid_date: Date,
  last_music_submission: Date,

  competition_class: {
    type: ObjectId,
    ref: 'CompClass'
  },
  unit_type: {
    type: ObjectId,
    ref: 'UnitType'
  },
  director: {
    type: ObjectId,
    ref: 'User'
  },
  organization: {
    type: ObjectId,
    ref: 'Organization'
  },
  form_obligations: [_FormModel.FormObligationSchema],
  spiel: _SpielSchema2.default,

  registered: Boolean
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UnitSchema.plugin(_mongooseLifecycle2.default);

UnitSchema.virtual('formattedCreationDate').get(function () {
  return (0, _moment2.default)(this.createdAt).format('MMM. Do, YYYY h:mm a');
});

UnitSchema.virtual('detailsUrl').get(function () {
  return '/units/' + this.slug;
});

UnitSchema.statics.fillableFields = function () {
  return ['name', 'slug', 'members', 'competiton_class', 'image_url'];
};

exports.default = _mongoose2.default.model('Unit', UnitSchema);
module.exports = exports['default'];