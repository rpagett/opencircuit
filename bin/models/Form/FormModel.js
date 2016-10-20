'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormObligationModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var FormObligationSchema = new _mongoose2.default.Schema({
  form: {
    type: ObjectId,
    ref: 'Form'
  },
  system_filename: String,
  extension: String,
  due_date: Date,
  approved: Boolean
});

var FormObligationModel = exports.FormObligationModel = _mongoose2.default.model('FormObligation', FormObligationSchema);