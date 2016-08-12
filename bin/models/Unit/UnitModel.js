'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var UnitSchema = _mongoose2.default.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  image_url: String,

  competition_class: {
    type: ObjectId,
    ref: CompetitionClass
  },
  unit_type: {
    type: ObjectId,
    ref: UnitType
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

exports.default = _mongoose2.default.model('Unit', UnitSchema);