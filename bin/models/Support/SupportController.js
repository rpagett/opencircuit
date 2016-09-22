'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mail = require('../../helpers/mail');

var Email = _interopRequireWildcard(_mail);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are '/api/support/...'

router.post('/', function (req, res) {
  try {
    if (!req.body.subject) {
      res.json({
        success: false,
        errors: [{ field: 'subject', message: 'Subject cannot be blank.' }]
      });
    } else if (!req.body.details) {
      res.json({
        success: false,
        errors: [{ field: 'details', message: 'Details cannot be blank.' }]
      });
    }

    var body = '\n      <p><strong>From:</strong> ' + req.user.formattedName + ' (' + req.user.email + ')</p>\n      <p>' + req.body.details + '</p>\n    ';

    Email.sendHTML('riley@opencircuit.us', "[Support]: " + req.body.subject, body);
    res.json({
      success: true,
      redirect: '/support/success'
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message
    });
  }
});

exports.default = router;
module.exports = exports['default'];