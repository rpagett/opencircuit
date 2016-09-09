import Mongoose from 'mongoose';

const FeeCategorySchema = new Mongoose.Schema({
  name: String,
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

export default Mongoose.model('FeeCategory', FeeCategorySchema);