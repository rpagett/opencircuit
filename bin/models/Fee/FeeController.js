'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _paypalRestSdk = require('paypal-rest-sdk');

var _paypalRestSdk2 = _interopRequireDefault(_paypalRestSdk);

var _functions = require('../../helpers/functions');

var _UserRoles = require('../User/UserRoles');

var _authRoute = require('../../middleware/authRoute');

var _FeeValidation = require('./FeeValidation');

var _PaymentTypes = require('./PaymentTypes');

var _PaymentTypes2 = _interopRequireDefault(_PaymentTypes);

var _FeeCategoryModel = require('../FeeCategory/FeeCategoryModel');

var _FeeCategoryModel2 = _interopRequireDefault(_FeeCategoryModel);

var _FeeStructure = require('./FeeStructure');

var _FeeStructure2 = _interopRequireDefault(_FeeStructure);

var _EventRegistrationModel = require('../Pivots/EventRegistrationModel');

var _EventRegistrationModel2 = _interopRequireDefault(_EventRegistrationModel);

var _FeeModel = require('./FeeModel');

var _FeeModel2 = _interopRequireDefault(_FeeModel);

var _OrganizationModel = require('../Organization/OrganizationModel');

var _OrganizationModel2 = _interopRequireDefault(_OrganizationModel);

var _UnitModel = require('../Unit/UnitModel');

var _UnitModel2 = _interopRequireDefault(_UnitModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// All routes are /api/fees/

function assessFee(unit_id, amount, category) {
  var notes = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
  var due_date = arguments.length <= 4 || arguments[4] === undefined ? _FeeModel2.default.DUE_DATE() : arguments[4];

  _FeeCategoryModel2.default.findOne({ slug: category }, '_id name').then(function (feecat) {
    if (!feecat) {
      throw new Error('Invalid category.');
    }

    return _FeeModel2.default.create({
      unit: unit_id,
      amount: amount,
      category: feecat._id,
      assessed_date: Date.now(),
      due_date: due_date,
      notes: notes
    });
  }).then(function (fee) {
    console.log('Assessed a fee of $', fee.amount, 'on', fee.assessed_date, '. It is due', fee.due_date);
  }).catch(function (err) {
    console.log('Error assessing fee.', err.message);
  });
}

_UnitModel2.default.on('afterInsert', function (newUnit) {
  var unit = newUnit;

  if (unit.circuit_member) {
    _UnitModel2.default.count({ organization: unit.organization }).then(function (count) {
      var amount = (0, _FeeStructure2.default)(count);
      console.log(count, 'existing units. Fee should be $', amount);

      assessFee(unit._id, amount, 'member-fee');
    });
  }
});

_EventRegistrationModel2.default.on('afterInsert', function (registration) {
  console.log('INSERTING REGISTRATION FEES', registration);
  _UnitModel2.default.findOne({ _id: registration.unit }).then(function (unit) {
    assessFee(unit._di, _FeeModel2.default.NON_MEMBER_FEE(), 'non-member-fee', 'Event ' + registration.event);
  }).catch(function (err) {
    console.log(err);
  });
});

router.route('/').get((0, _authRoute.hasRole)(_UserRoles.UserRoles.Administrator), function (req, res) {
  _FeeModel2.default.find({}).populate('unit', 'name slug organization detailsUrl').populate('unit.organization', 'name slug detailsUrl').populate('category', 'name slug').populate('payments').sort('unit.name').sort('due_date').exec().then(function (fees) {
    res.json({
      success: true,
      contents: fees
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
}).post(function (req, res) {
  assessFee(req.body.unit, req.body.amount, req.body.category, req.body.notes, req.body.due_date);

  res.json({
    success: true
  });
});

router.get('/paymentTypes', function (req, res) {
  var json = [];
  for (var key in _PaymentTypes2.default) {
    json.push({
      value: key,
      label: _PaymentTypes2.default[key]
    });
  }

  res.json(json);
});

router.post('/userPay', function (req, res) {
  console.log('FEES', req.body.fees);

  var toPay = [];
  for (var key in req.body.fees) {
    if (req.body.fees[key]) {
      toPay.push(key);
    }
  }

  console.log('PAYING', toPay);

  _FeeModel2.default.find({ _id: { $in: toPay } }, 'unit amount category').populate('unit', 'name').populate('category', 'name').exec().then(function (fees) {
    var feeItems = [];
    var feeTotal = 0;

    fees.map(function (fee) {
      feeItems.push({
        "name": fee.unit.name,
        "description": fee.category.name,
        "price": fee.amountRemaining,
        "currency": 'USD',
        "quantity": "1"
      });

      feeTotal += fee.amountRemaining;
    });

    console.log('Paypal mode is ', process.env.PAYPAL_MODE);
    _paypalRestSdk2.default.configure({
      'mode': process.env.PAYPAL_MODE,
      'client_id': process.env.PAYPAL_CLIENT,
      'client_secret': process.env.PAYPAL_SECRET,
      'headers': {
        'custom': 'header'
      }
    });

    var payment_details = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "google.com",
        "cancel_url": "google.com"
      },
      "transactions": [{
        "item_list": {
          "items": feeItems
        },
        "amount": {
          "currency": "USD",
          "total": feeTotal
        },
        "description": "These are the fees to be paid."
      }]
    };

    console.log('PAYPAL', payment_details);

    _paypalRestSdk2.default.payment.create(payment_details, function (error, payment) {
      if (error) {
        throw error;
      } else {
        //console.log("Create Payment Response");
        //console.log(payment);

        var redirect = _lodash2.default.find(payment.links, { method: 'REDIRECT' });
        console.log('REDIRECT', redirect);

        if (redirect) {
          res.send({
            success: true,
            external: true,
            redirect: redirect.href
          });
        }
      }
    });
  });
});

router.post('/:fee_id/applyPayment', function (req, res) {
  var data = {};
  (0, _FeeValidation.validatePayment)(req.body).then(function (validatedData) {
    data = validatedData;

    return _FeeModel2.default.findOne({ _id: req.params.fee_id }, 'unit amount payments').populate('unit', 'slug name organization').populate('payments').exec();
  }).catch(function (errors) {
    res.json({
      success: false,
      errors: errors
    });
  }).then(function (fee) {
    var alreadyPaid = _lodash2.default.sumBy(fee.payments, 'amount');
    console.log('Already paid', alreadyPaid);
    var amountToPay = Math.min(data.amount, fee.amountRemaining);
    console.log('Amount to pay', amountToPay);

    if (amountToPay) {
      fee.payments.push({
        amount: amountToPay,
        fee: fee._id,
        method: data.payment_type
      });
    }

    if (amountToPay <= 0 || fee.amountRemaining - amountToPay <= 0) {
      fee.paid_date = Date.now();
    }

    return fee.save();
  }).then(function () {
    res.json({
      success: true,
      redirect: '/fees'
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.get('/seed', function (req, res) {
  var creation = [{ name: 'Member Fee', slug: 'member-fee' }, { name: 'Non-member Fee', slug: 'non-member-fee' }];

  _FeeCategoryModel2.default.create(creation).then(function () {
    res.json({
      success: true
    });
  });
});

router.get('/orgsForUser/:user_id', function (req, res) {
  _UnitModel2.default.find({ director: req.params.user_id, registered: true }, '_id').then(function (units) {
    var ids = _lodash2.default.map(units, '_id');
    return _FeeModel2.default.find({ paid_date: null, unit: { $in: ids } }, 'unit payments due_date amount').populate('unit', 'organization').exec();
  }).then(function (fees) {
    if (!fees) {
      res.json({
        success: true,
        contents: {}
      });
    }
    var unique = _lodash2.default.uniqBy(fees, function (e) {
      return e.unit.organization;
    });
    var orgs = _lodash2.default.map(unique, function (e) {
      return e.unit.organization;
    });

    return _OrganizationModel2.default.find({ _id: { $in: orgs } }, '_id slug name');
  }).then(function (orgs) {
    res.json({
      success: true,
      contents: {
        orgs: orgs
      }
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

router.get('/invoice/:org', function (req, res) {
  var storeOrg = {};
  _OrganizationModel2.default.findOne({ _id: req.params.org }, '_id name').then(function (org) {
    if (!org) {
      res.send('Organization not found.');
    }

    storeOrg = org;
    return _UnitModel2.default.find({ organization: storeOrg._id, registered: true }, '_id');
  }).then(function (units) {
    var ids = _lodash2.default.map(units, '_id');
    return _FeeModel2.default.find({ paid_date: null, unit: { $in: ids } }, 'unit payments due_date amount').populate('unit', '_id name')
    //.populate('payments', 'amount')
    .exec();
  }).then(function (fees) {
    res.json({
      success: true,
      contents: {
        orgName: storeOrg.name,
        fees: fees
      }
    });
  });
});

router.get('/forUser/:user_id', function (req, res) {
  var ids = [];
  _OrganizationModel2.default.find({ director: req.params.user_id }, '_id').then(function (orgs) {
    var ids = _lodash2.default.map(orgs, '_id');

    return _UnitModel2.default.find({ organization: { $in: ids } });
  }).then(function (units) {
    var ids = _lodash2.default.map(units, '_id');

    return _FeeModel2.default.find({ paid_date: null, unit: { $in: ids } }).populate('unit', 'name slug organization detailsUrl').populate('unit.organization', 'name slug detailsUrl').populate('category', 'name slug').populate('payments').sort('unit.name').sort('due_date').exec();
  }).then(function (fees) {
    res.json({
      success: true,
      contents: fees
    });
  }).catch(function (err) {
    res.json({
      success: false,
      error: err.message
    });
  });
});

exports.default = router;