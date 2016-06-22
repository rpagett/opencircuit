import Mongoose from 'mongoose';

const VenueSchema = new Mongoose.Schema({

}, {
  timestamps: true,
  //toObject: {
  //  virtuals: true
  //},
  //toJSON: {
  //  virtuals: true
  //}
});

export default Mongoose.model('Venue', VenueSchema);