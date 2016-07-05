import Mongoose from 'mongoose';

const EventSchema = new Mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  date: Date,
  start_time: String,
  attendance_cap: Number,
  registration_open: Boolean,
  critique_open: Boolean
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

export default Mongoose.model('Event', EventSchema);