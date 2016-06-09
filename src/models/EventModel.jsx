import Mongoose from 'mongoose';

const EventSchema = new Mongoose.Schema({
  shortname: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  date: Date,
  start_time: {
    type : Date,
    default: Date.now
  },

  street: String,
  city: String,
  state: String,
  zip: Number,

  attendance_cap: Number,
  registration_open: {
    type: Boolean,
    default: true
  },
  critique_open: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default Mongoose.model('Event', EventSchema);