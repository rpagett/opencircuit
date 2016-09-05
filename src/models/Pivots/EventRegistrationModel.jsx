import Mongoose from 'mongoose';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const EventRegistrationSchema = new Mongoose.Schema({
  unit: {
    type: ObjectId,
    ref: 'Unit'
  },
  event: {
    type: ObjectId,
    ref: 'Event'
  },
  competition_class: {
    type: ObjectId,
    ref: 'CompetitionClass'
  },

  performance_time: Date,
  exhibition: Boolean,
  attending_critique: Boolean,

  score: Number
});

export default Mongoose.model('EventRegistration', EventRegistrationSchema)