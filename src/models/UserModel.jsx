import Mongoose from 'mongoose';
import PassportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Mongoose.Schema({
  first_name:     String,
  last_name:      String,
  middle_initial: String,
}, {
  timestamps:     true
});

UserSchema.virtual('formattedName').get(function() {
  if (this.middle_initial) {
    return this.first_name + ' ' + this.middle_initial +
      '. ' + this.last_name;
  }

  return this.first_name + ' ' + this.last_name;
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