'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormObligationSchema = exports.Form = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var FormSchema = new _mongoose2.default.Schema({
  name: String,
  description: String,
  due_date: Date,

  form_filename: String,
  form_extension: String,
  uploader: {
    type: ObjectId,
    ref: 'User'
  },

  autoapply_classes: {
    type: [ObjectId],
    ref: 'CompetitionClass'
  },
  autoapply_scholastic: Boolean,
  autoapply_independent: Boolean,
  autoapply_all: Boolean
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

FormSchema.statics.DUE_DATE = function () {
  return Date.parse('Dec 31, 2016');
};

FormSchema.virtual('detailsUrl').get(function () {
  return '/forms/' + this._id;
});

FormSchema.virtual('formattedDueDate').get(function () {
  return (0, _moment2.default)(this.due_date).format('MMM. Do, YYYY');
});

var Form = exports.Form = _mongoose2.default.model('Form', FormSchema);
exports.default = Form;
var FormObligationSchema = exports.FormObligationSchema = new _mongoose2.default.Schema({
  form: {
    type: ObjectId,
    ref: 'Form'
  },
  system_filename: String,
  extension: String,
  due_date: Date,

  submitted: Boolean,
  approved: Boolean
}, {
  timestamps: true
});