'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventModel = require('../models/EventModel');

var _EventModel2 = _interopRequireDefault(_EventModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventRepository = function () {
  function EventRepository() {
    _classCallCheck(this, EventRepository);
  }

  _createClass(EventRepository, null, [{
    key: 'all',
    value: function all() {
      return _EventModel2.default.find({}, function (err, events) {
        if (err) return null;

        return events;
      });
    }
  }]);

  return EventRepository;
}();

exports.default = EventRepository;