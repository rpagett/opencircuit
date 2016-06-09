'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  first_name: String,
  last_name: String,
  middle_initial: String
}, {
  timestamps: true
});

UserSchema.virtual('formattedName').get(function () {
  if (this.middle_initial) {
    return this.first_name + ' ' + this.middle_initial + '. ' + this.last_name;
  }

  return this.first_name + ' ' + this.last_name;
});

UserSchema.plugin(_passportLocalMongoose2.default, {
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
    UserExistsError: 'There is already an account associated with that email address.'
  }
});

exports.default = _mongoose2.default.model('User', UserSchema);