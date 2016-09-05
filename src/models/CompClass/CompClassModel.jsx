import Mongoose from 'mongoose'

import UnitType from '../UnitType/UnitTypeModel';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const CompClassSchema = new Mongoose.Schema({
  abbreviation: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  unit_type: {
    type: ObjectId,
    ref: 'UnitType'
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

CompClassSchema.virtual('formattedName').get(function() {
  return this.name + ' (' + this.abbreviation.toUpperCase() + ')';
})

CompClassSchema.virtual('detailsUrl').get(function() {
  return `/compclasses/${this.abbreviation.toLowerCase()}`
})

export default Mongoose.model('CompClass', CompClassSchema)