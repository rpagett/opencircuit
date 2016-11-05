import Mongoose from 'mongoose';
import Moment from 'moment';

const ObjectId = Mongoose.Schema.Types.ObjectId;

const FormSchema = new Mongoose.Schema({
  name: String,
  description: String,
  due_date: Date,

  form_filename: String,
  form_extension: String,
  uploader: {
    type: ObjectId,
    ref: 'User'
  },

  autoapply_classes: {
    type: [ObjectId],
    ref: 'CompetitionClass'
  },
  autoapply_scholastic: Boolean,
  autoapply_independent: Boolean,
  autoapply_all: Boolean
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

FormSchema.statics.DUE_DATE = () => {
  return Date.parse('Dec 31, 2016');
}

FormSchema.virtual('detailsUrl').get(function() {
  return `/forms/${this._id}`;
});

FeeSchema.virtual('formattedDueDate').get(function() {
  return Moment(this.due_date).format('MMM. Do, YYYY');
});

export const Form = Mongoose.model('Form', FormSchema);
export default Form;

export const FormObligationSchema = new Mongoose.Schema({
  form: {
    type: ObjectId,
    ref: 'Form'
  },
  system_filename: String,
  extension: String,
  due_date: Date,

  submitted: Boolean,
  approved: Boolean
}, {
  timestamps: true
});