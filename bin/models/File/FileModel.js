'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var FileSchema = new _mongoose2.default.Schema({
  user_filename: String,
  system_filename: String,
  uploader: {
    type: ObjectId,
    ref: 'User'
  },
  extension: String
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

FileSchema.virtual('formattedCreationDate').get(function () {
  return (0, _moment2.default)(this.createdAt).format('MMM. Do, YYYY [at] h:mm a');
});

FileSchema.virtual('userUrl').get(function () {
  return '/api/files/' + this.system_filename;
});

exports.default = _mongoose2.default.model('File', FileSchema);
module.exports = exports['default'];