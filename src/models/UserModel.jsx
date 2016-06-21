import Mongoose from 'mongoose';
import PassportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Mongoose.Schema({
  first_name: String,
  last_name: String,
  mi: String,
  phone: String,
  street: String,
  address_2: String,
  city: String,
  state: {
    type: String,
    minlength: 2,
    maxlength: 5,
  },
  zip: {
    type: String,
    minlength: 5,
    maxlength: 5
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

UserSchema.virtual('formattedName').get(function() {
  return this.first_name + ' ' + (this.mi ? this.mi + '. ' : '') + this.last_name;
});

UserSchema.plugin(PassportLocalMongoose, {
  usernameField: 'email',
  usernameQueryFields: ['email'],
  saltField: 'loginSalt',
  attemptsField: 'loginAttempts',
  usernameLowerCase: true,
  errorMessages: {
    MissingUsernameError: 'You must provide an email address.',
    MissingPasswordError: 'You must provide a password.',
    IncorrectPasswordError: 'Your email and password do not match.',
    IncorrectUsernameError: 'There is no account registered with that email address.',
    UserExistsError: 'There is already an account associated with that email address.',
  }
});

export default Mongoose.model('User', UserSchema);