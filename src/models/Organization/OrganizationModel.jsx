import Mongoose from 'mongoose';
import UserModel from '../User/UserModel';

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
  ZIP: String,

  is_school: Boolean,

  director: {
    type: ObjectId,
    ref: UserModel
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

export default Mongoose.model('Organization', OrganizationSchema);