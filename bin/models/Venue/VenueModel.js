'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VenueSchema = new _mongoose2.default.Schema({}, {
  timestamps: true
});

//toObject: {
//  virtuals: true
//},
//toJSON: {
//  virtuals: true
//}
exports.default = _mongoose2.default.model('Venue', VenueSchema);