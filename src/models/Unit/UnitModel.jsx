import Mongoose from 'mongoose';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const UnitSchema = Mongoose.Schema({
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

export default Mongoose.model('Unit', UnitSchema);