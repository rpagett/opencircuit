'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EventController = require('./models/Event/EventController');

var _EventController2 = _interopRequireDefault(_EventController);

var _UnitTypeController = require('./models/UnitType/UnitTypeController');

var _UnitTypeController2 = _interopRequireDefault(_UnitTypeController);

var _UserController = require('./models/User/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/events/', _EventController2.default);
router.use('/unittypes/', _UnitTypeController2.default);
router.use('/users/', _UserController2.default);

router.all('*', function (req, res) {
  res.status(404).send('Denied.');
});

exports.default = router;