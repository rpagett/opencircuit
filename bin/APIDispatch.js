'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _CompClassController = require('./models/CompClass/CompClassController');

var _CompClassController2 = _interopRequireDefault(_CompClassController);

var _EventController = require('./models/Event/EventController');

var _EventController2 = _interopRequireDefault(_EventController);

var _FeeController = require('./models/Fee/FeeController');

var _FeeController2 = _interopRequireDefault(_FeeController);

var _FeeCategoryController = require('./models/FeeCategory/FeeCategoryController');

var _FeeCategoryController2 = _interopRequireDefault(_FeeCategoryController);

var _FileController = require('./models/File/FileController');

var _FileController2 = _interopRequireDefault(_FileController);

var _FormController = require('./models/Form/FormController');

var _FormController2 = _interopRequireDefault(_FormController);

var _JudgeController = require('./models/Judge/JudgeController');

var _JudgeController2 = _interopRequireDefault(_JudgeController);

var _OrganizationController = require('./models/Organization/OrganizationController');

var _OrganizationController2 = _interopRequireDefault(_OrganizationController);

var _RegistrationController = require('./models/Registration/RegistrationController');

var _RegistrationController2 = _interopRequireDefault(_RegistrationController);

var _ReportController = require('./models/Report/ReportController');

var _ReportController2 = _interopRequireDefault(_ReportController);

var _SupportController = require('./models/Support/SupportController');

var _SupportController2 = _interopRequireDefault(_SupportController);

var _UnitController = require('./models/Unit/UnitController');

var _UnitController2 = _interopRequireDefault(_UnitController);

var _UnitTypeController = require('./models/UnitType/UnitTypeController');

var _UnitTypeController2 = _interopRequireDefault(_UnitTypeController);

var _UserController = require('./models/User/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/compclasses/', _CompClassController2.default);
router.use('/events/', _EventController2.default);
router.use('/fees/', _FeeController2.default);
router.use('/feecategories/', _FeeCategoryController2.default);
router.use('/files/', _FileController2.default);
router.use('/forms/', _FormController2.default);
router.use('/judges/', _JudgeController2.default);
router.use('/organizations/', _OrganizationController2.default);
router.use('/register/', _RegistrationController2.default);
router.use('/reports/', _ReportController2.default);
router.use('/support/', _SupportController2.default);
router.use('/units/', _UnitController2.default);
router.use('/unittypes/', _UnitTypeController2.default);
router.use('/users/', _UserController2.default);

router.all('*', function (req, res) {
  res.status(404).send('Denied.');
});

exports.default = router;
module.exports = exports['default'];