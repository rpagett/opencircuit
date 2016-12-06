import Mongoose from 'mongoose';
import Moment from 'moment';
import _ from 'lodash';

const ObjectId = Mongoose.Schema.Types.ObjectId;

const SpielSchema = new Mongoose.Schema({
  unit_name: String,
  show_title: String,
  staff: String,
  age_outs: String
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

export default SpielSchema;