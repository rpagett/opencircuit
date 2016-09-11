'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _UserEmails = require('./UserEmails');

var UserEmail = _interopRequireWildcard(_UserEmails);

var _mail = require('../../helpers/mail');

var Email = _interopRequireWildcard(_mail);

var _UserModel = require('./UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _UserValidation = require('./UserValidation');

var _UserValidation2 = _interopRequireDefault(_UserValidation);

var _UserRoles = require('./UserRoles');

var _authRoute = require('../../middleware/authRoute');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express2.default.Router();
// routes are '/api/users/...'

router.get('/', (0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UserModel2.default.find({}, 'email first_name mi last_name formattedName profileUrl phone').sort('last_name').exec().then(function (users) {
    res.json({
      success: true,
      contents: users
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.get('/select', function (req, res) {
  _UserModel2.default.find({}, 'first_name mi last_name').then(function (users) {
    var json = [];
    users.map(function (user) {
      json.push({
        value: user._id.toString(),
        label: user.formattedName
      });
    });

    res.json(json);
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.route('/:email').get(function (req, res) {
  _UserModel2.default.findOne({ email: req.params.email }, '-password -hash -salt -createdAt -updatedAt').then(function (user) {
    if (!user) {
      throw new Error('That user does not exist.');
    } else {
      res.json({
        success: true,
        model: user
      });
    }
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.userOrAdmin)(), function (req, res) {
  console.log('Body is:', req.body);
  (0, _UserValidation2.default)(req.body).then(function (data) {
    if (req.params.email != data.email) {
      throw [{ field: 'email', message: 'There was an authorization error.' }];
    }

    var fillableData = _lodash2.default.pick(data, _UserModel2.default.fillableFields());
    _UserModel2.default.findOneAndUpdate({ email: data.email }, fillableData, {
      fields: 'email'
    }).then(function (data) {
      res.send({
        success: true,
        redirect: '/users/' + data.email
      });
    });
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  });
});

router.route('/:email/roles').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _UserModel2.default.findOne({ email: req.params.email }, 'roles').then(function (user) {
    if (!user) {
      throw new Error('That user does not exist.');
    }

    var userRoles = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = user.roles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        userRoles[key] = true;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    res.json({
      success: true,
      model: _defineProperty({
        _id: user._id
      }, 'roles[]', userRoles)
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).patch((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  var inRoles = req.body['roles[]'];
  console.log(inRoles);

  var userRoles = [];
  Object.keys(inRoles).forEach(function (key, index) {
    if (inRoles[key] === true) {
      userRoles.push(key);
    }
  });

  console.log('Final', userRoles);
  _UserModel2.default.findOneAndUpdate({ email: req.params.email }, {
    roles: userRoles
  }).then(function (user) {
    res.json({
      success: true
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

exports.default = router;