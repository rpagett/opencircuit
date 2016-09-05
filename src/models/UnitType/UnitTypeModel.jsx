import Mongoose from 'mongoose';

const UnitTypeSchema = new Mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true
  },
  name: String
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UnitTypeSchema.virtual('detailsUrl').get(function() {
  return `/unittypes/${this.slug}`;
})

export default Mongoose.model('UnitType', UnitTypeSchema);