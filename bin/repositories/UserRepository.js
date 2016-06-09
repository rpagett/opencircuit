'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRepository = function () {
  function UserRepository() {
    _classCallCheck(this, UserRepository);
  }

  _createClass(UserRepository, null, [{
    key: 'findByEmail',
    value: function findByEmail(email, callback) {
      var user = _UserModel2.default.findOne({ 'email': email }, function (err, user) {
        console.log('In repo: Email = ' + email + ', User = ' + user);
        callback(err, user);
      });
    }
  }, {
    key: 'findByToken',
    value: function findByToken(token) {
      _UserModel2.default.findById(token, function (err, user) {
        if (err) {
          return null;
        }

        return user;
      });
    }
  }]);

  return UserRepository;
}();

exports.default = UserRepository;