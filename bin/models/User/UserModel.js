'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserRoles = Object.freeze({
  Administrator: 1,
  SiteManager: 2,
  Tabulator: 3,
  FormsManager: 4
});

var UserSchema = new _mongoose2.default.Schema({
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
    maxlength: 5
  },
  zip: {
    type: String,
    minlength: 5,
    maxlength: 5
  },
  roles: [Number]
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

function userHasRole(user, role) {
  return user.roles.includes(UserRoles.Administrator) || user.roles.includes(role);
}

UserSchema.methods.isAdministrator = function () {
  return userHasRole(undefined, UserRoles.Administrator);
};
UserSchema.methods.isSiteManager = function () {
  return userHasRole(undefined, UserRoles.Administrator);
};

// TODO tomorrow: setting/modifying User roles using react-overlays(?), gating components by role, gating routes by role
// .then() => forgot password so I don't neglect that forever.

UserSchema.virtual('formattedName').get(function () {
  return this.first_name + ' ' + (this.mi ? this.mi + '. ' : '') + this.last_name;
});

UserSchema.virtual('profileURL').get(function () {
  return '/users/' + this.email;
});

UserSchema.statics.fillableFields = function () {
  return ['first_name', 'mi', 'last_name', 'phone', 'street', 'address_2', 'city', 'state', 'zip'];
};

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