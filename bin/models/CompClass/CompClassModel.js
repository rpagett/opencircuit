'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UnitTypeModel = require('../UnitType/UnitTypeModel');

var _UnitTypeModel2 = _interopRequireDefault(_UnitTypeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var CompClassSchema = new _mongoose2.default.Schema({
  abbreviation: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  unit_type: {
    type: ObjectId,
    ref: 'UnitType'
  },
  scholastic: Boolean
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

CompClassSchema.virtual('formattedName').get(function () {
  return this.name + ' (' + this.abbreviation.toUpperCase() + ')';
});

CompClassSchema.virtual('detailsUrl').get(function () {
  return '/compclasses/' + this.abbreviation.toLowerCase();
});

exports.default = _mongoose2.default.model('CompClass', CompClassSchema);