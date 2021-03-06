import React from 'react';
import { Link } from 'react-router';
import Mongoose from 'mongoose';
import PassportLocalMongoose from 'passport-local-mongoose';
import { UserRoles } from './UserRoles';

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
  },

  roles: {
    type: [Number],
    default: []
  },

  confirmed: Boolean,
  confirmation_token: String,

  recovery_token: String,

  apiToken: String
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

UserSchema.virtual('profileUrl').get(function() {
  return `/users/${this.email}`;
});

UserSchema.statics.fillableFields = () => {
  return ['first_name', 'mi', 'last_name', 'phone', 'street', 'address_2', 'city', 'state', 'zip'];
}

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
    UserExistsError: 'There is already an account associated with that email address.'
  }
});

const UserModel = Mongoose.model('User', UserSchema);
export default UserModel;