import Mongoose from 'mongoose';

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

export default Mongoose.model('CompClass', CompClassSchema)