import Mongoose from 'mongoose';
import mLifecycle from 'mongoose-lifecycle';

import UnitType from '../UnitType/UnitTypeModel';
import CompClass from '../CompClass/CompClassModel';
import User from '../User/UserModel';
import Organization from '../Organization/OrganizationModel';

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

UnitSchema.virtual('detailsUrl').get(function() {
  return `/units/${this.slug}`;
});

UnitSchema.statics.fillableFields = () => {
  return ['name', 'slug', 'members', 'competiton_class', 'image_url'];
}

export default Mongoose.model('Unit', UnitSchema);