"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthUser = function () {
  function AuthUser() {
    _classCallCheck(this, AuthUser);
  }

  _createClass(AuthUser, null, [{
    key: "setUser",
    value: function setUser(user) {
      this.currentUser = user;
    }
  }, {
    key: "getUser",
    value: function getUser() {
      return this.currentUser || null;
    }
  }]);

  return AuthUser;
}();

exports.default = AuthUser;