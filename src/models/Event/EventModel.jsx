import Mongoose from 'mongoose';
import Moment from 'moment';

const EventSchema = new Mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  image_url: String,
  facebook_url: String,
  date: Date,
  registration_autoclose: Date,
  attendance_cap: Number,
  registration_closed: Boolean,
  critique_closed: Boolean,

  notes: String, //EventDirector+

  // Ticket Prices
  adult_ticket_price: Number,
  youth_ticket_price: Number
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

EventSchema.virtual('detailsUrl').get(function() {
  return `/events/${this.slug}`;
})

EventSchema.virtual('formattedDate').get(function() {
  return Moment(this.date).format('MMM. Do, YYYY [at] h:mm a');
});

EventSchema.statics.fillableFields = () => {
  return ['name', 'slug', 'facebook_url', 'date', 'registration_autoclose', 'attendance_cap', 'registration_closed',
    'critique_closed', 'notes', 'adult_ticket_price', 'youth_ticket_price'];
}

export default Mongoose.model('Event', EventSchema);