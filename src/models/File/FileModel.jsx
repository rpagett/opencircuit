import Mongoose from 'mongoose';
import Moment from 'moment';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const FileSchema = new Mongoose.Schema({
  user_filename: String,
  system_filename: String,
  uploader: {
    type: ObjectId,
    ref: 'User'
  },
  extension: String,
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

FileSchema.virtual('formattedCreationDate').get(function() {
  return Moment(this.createdAt).format('MMM. Do, YYYY [at] h:mm a');
});

FileSchema.virtual('userUrl').get(function() {
  return `/api/files/${this.system_filename}`;
})

export default Mongoose.model('File', FileSchema);