import Mongoose from 'mongoose';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const JudgeSchema = new Mongoose.Schema({
  first_name: String,
  middle_initial: String,
  last_name: String,
  dob: String,
  gender: String,

  phone: String,
  street: String,
  address_2: String,
  city: String,
  state: String,
  zip: String,

  ff_airline: String,
  ff_number: String,
  airport: String,
  friday_departure: String,
  sunday_departure: String,
  bio: String,
  dietary_needs: String,
  comments: String,

  self_edit_hash: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

export default Mongoose.model('Judge', JudgeSchema);