import Mongoose from 'mongoose';

const ObjectId = Mongoose.Schema.Types.ObjectId;
const FileSchema = new Mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  filename: String,
  uploader: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

export default Mongoose.model('File', FileSchema);