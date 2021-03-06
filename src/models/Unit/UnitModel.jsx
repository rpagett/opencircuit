import Mongoose from 'mongoose';
import Moment from 'moment';
import mLifecycle from 'mongoose-lifecycle';

import UnitType from '../UnitType/UnitTypeModel';
import CompClass from '../CompClass/CompClassModel';
import User from '../User/UserModel';
import Organization from '../Organization/OrganizationModel';
import { FormObligationSchema } from '../Form/FormModel';
import SpielSchema from '../Spiel/SpielSchema'

const ObjectId = Mongoose.Schema.Types.ObjectId;
const UnitSchema = Mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  members: Number,
  image_url: String,
  notes: String,

  circuit_member: Boolean,
  plus_pass: Boolean,
  confirmed_paid_date: Date,
  last_music_submission: Date,

  competition_class: {
    type: ObjectId,
    ref: 'CompClass'
  },
  unit_type: {
    type: ObjectId,
    ref: 'UnitType'
  },
  director: {
    type: ObjectId,
    ref: 'User'
  },
  organization: {
    type: ObjectId,
    ref: 'Organization'
  },
  form_obligations: [FormObligationSchema],
  spiel: SpielSchema,

  registered: Boolean,
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UnitSchema.plugin(mLifecycle);

UnitSchema.virtual('formattedCreationDate').get(function() {
  return Moment(this.createdAt).format('MMM. Do, YYYY h:mm a');
});

UnitSchema.virtual('detailsUrl').get(function() {
  return `/units/${this.slug}`;
});

UnitSchema.statics.fillableFields = () => {
  return ['name', 'slug', 'members', 'competition_class', 'image_url', 'registered', 'plus_pass', 'notes'];
}

export default Mongoose.model('Unit', UnitSchema);