import Mongoose from 'mongoose';
import mLifecycle from 'mongoose-lifecycle';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const OrganizationSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },

  street: String,
  street_2: String,
  city: String,
  state: String,
  zip: String,

  is_school: Boolean,

  director: {
    type: ObjectId,
    ref: 'User'
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

OrganizationSchema.plugin(mLifecycle);

OrganizationSchema.virtual('detailsUrl').get(function() {
  return `/organizations/${this.slug}`;
})

export default Mongoose.model('Organization', OrganizationSchema);