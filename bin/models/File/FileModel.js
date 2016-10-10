'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var FileSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  filename: String,
  uploader: {
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

exports.default = _mongoose2.default.model('File', FileSchema);
module.exports = exports['default'];