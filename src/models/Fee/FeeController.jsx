import Express from 'express';
import _ from 'lodash';
import Paypal from 'paypal-rest-sdk';

import { fetchAPI } from '../../helpers/functions';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

import { validatePayment } from './FeeValidation';
import PaymentTypes from './PaymentTypes';
import FeeCategory from '../FeeCategory/FeeCategoryModel'
import determineFee from './FeeStructure';

import EventRegistration from '../Pivots/EventRegistrationModel';
import Fee from './FeeModel';
import Organization from '../Organization/OrganizationModel';
import Unit from '../Unit/UnitModel';

let router = Express.Router();
// All routes are /api/fees/

function configurePaypal() {
  Paypal.configure({
    'mode': process.env.PAYPAL_MODE,
    'client_id': process.env.PAYPAL_CLIENT,
    'client_secret': process.env.PAYPAL_SECRET,
    'headers' : {
      'custom': 'header'
    }
  });
}

function assessFee(unit_id, amount, category, notes = '', due_date = Fee.DUE_DATE()) {
  FeeCategory.findOne({ slug: category }, '_id name')
    .then(feecat => {
      if (!feecat) {
        throw new Error('Invalid category.');
      }

      return Fee.create({
        unit: unit_id,
        amount: amount,
        category: feecat._id,
        assessed_date: Date.now(),
        due_date: due_date,
        notes
      })
    })
    .then(fee => {
      console.log('Assessed a fee of $', fee.amount, 'on', fee.assessed_date,
        '. It is due', fee.due_date);
    })
    .catch(err => {
      console.log('Error assessing fee.', err.message);
    })
}

Unit.on('afterInsert', newUnit => {
  const unit = newUnit;

  if (unit.circuit_member) {
    Unit.count({ organization: unit.organization })
      .then(count => {
        const amount = determineFee(count);
        console.log(count, 'existing units. Fee should be $', amount);

        assessFee(unit._id, amount, 'member-fee')
      })
  }
});

EventRegistration.on('afterInsert', registration => {
  console.log('INSERTING REGISTRATION FEES', registration)
  Unit.findOne({ _id: registration.unit })
    .then(unit => {
      assessFee(unit._di, Fee.NON_MEMBER_FEE(), 'non-member-fee', 'Event ' + registration.event)
    })
    .catch(err => {
      console.log(err);
    })
})


router.route('/')
  .get(hasRole(UserRoles.Administrator), (req, res) => {
    Fee.find({ })
      .populate('unit', 'name slug organization detailsUrl')
      .populate('unit.organization', 'name slug detailsUrl')
      .populate('category', 'name slug')
      .populate('payments')
      .sort('unit.name')
      .sort('due_date')
      .exec()
      .then(fees => {
        res.json({
          success: true,
          contents: fees
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })

  .post((req, res) => {
    assessFee(req.body.unit, req.body.amount, req.body.category, req.body.notes, req.body.due_date);

    res.json({
      success: true
    })
  });

router.get('/paypal-return', (req, res) => {
  console.log('Returning!', req.query)

  configurePaypal();
  const execute_payment_json = {
    "payer_id": req.query.PayerID
  };
  const paymentId = req.query.paymentId;

  Paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    }
    else {
      console.log("Get Payment Response");
      console.log(JSON.stringify(payment));
    }
  });
})

router.get('/paymentTypes', (req, res) => {
  let json = [ ];
  for (let key in PaymentTypes) {
    json.push({
      value: key,
      label: PaymentTypes[key]
    });
  }

  res.json(json);
})

router.post('/userPay', (req, res) => {
  console.log('FEES', req.body.fees);

  let toPay = [ ];
  for (let key in req.body.fees) {
    if (req.body.fees[key]) {
      toPay.push(key);
    }
  }

  console.log('PAYING', toPay);

  Fee.find({ _id: {$in: toPay} }, 'unit amount category')
    .populate('unit', 'name')
    .populate('category', 'name')
    .exec()
    .then(fees => {
      let feeItems = [ ];
      let feeTotal = 0;

      fees.map(fee => {
        feeItems.push({
          "name": fee.unit.name,
          "description": fee.category.name,
          "price": fee.amountRemaining,
          "currency": 'USD',
          "quantity": "1"
        })

        feeTotal += fee.amountRemaining;
      })

      console.log('Paypal mode is ', process.env.PAYPAL_MODE);
      configurePaypal();

      const payment_details = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": process.env.BASE_URL + '/api/fees/paypal-return',
          "cancel_url": process.env.BASE_URL + '/'
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

      Paypal.payment.create(payment_details, function (error, payment) {
        if (error) {
          throw error;
        }
        else {
          //console.log("Create Payment Response");
          //console.log(payment);

          const redirect = _.find(payment.links, { method: 'REDIRECT' });
          console.log('REDIRECT', redirect);

          if (redirect) {
            res.send({
              success: true,
              external: true,
              redirect: redirect.href
            })
          }
        }
      });
    });
})

router.post('/:fee_id/applyPayment', (req, res) => {
  let data = { };
  validatePayment(req.body)
    .then(validatedData => {
      data = validatedData;

      return Fee.findOne({_id: req.params.fee_id}, 'unit amount payments')
        .populate('unit', 'slug name organization')
        .populate('payments')
        .exec()
    })
    .catch(errors => {
      res.json({
        success: false,
        errors
      })
    })
    .then(fee => {
      const alreadyPaid = _.sumBy(fee.payments, 'amount');
      console.log('Already paid', alreadyPaid);
      const amountToPay = Math.min(data.amount, fee.amountRemaining);
      console.log('Amount to pay', amountToPay);

      if (amountToPay) {
        fee.payments.push({
          amount: amountToPay,
          fee: fee._id,
          method: data.payment_type
        })
      }

      if (amountToPay <= 0 || (fee.amountRemaining - amountToPay) <= 0) {
        fee.paid_date = Date.now();
      }

      return fee.save()
    })
    .then(() => {
      res.json({
        success: true,
        redirect: '/fees'
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
})

router.get('/seed', (req, res) => {
  const creation = [
    {name: 'Member Fee', slug: 'member-fee'},
    {name: 'Non-member Fee', slug: 'non-member-fee'}
  ]

  FeeCategory.create(creation)
    .then(() => {
      res.json({
        success: true
      })
    })
})

router.get('/orgsForUser/:user_id', (req, res) => {
  Unit.find({ director: req.params.user_id, registered: true}, '_id')
    .then(units => {
      const ids = _.map(units, '_id');
      return Fee.find({ paid_date: null, unit: {$in: ids} }, 'unit payments due_date amount')
        .populate('unit', 'organization')
        .exec()
    })
    .then(fees => {
      if (!fees) {
        res.json({
          success: true,
          contents: {}
        })
      }
      const unique = _.uniqBy(fees, e => {
        return e.unit.organization;
      })
      const orgs = _.map(unique, e => {
        return e.unit.organization;
      });

      return Organization.find({_id: {$in: orgs}}, '_id slug name')
    })
    .then(orgs => {
      res.json({
        success: true,
        contents: {
          orgs
        }
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
})

router.get('/invoice/:org', (req, res) => {
  let storeOrg = { }
  Organization.findOne({ _id: req.params.org }, '_id name')
    .then(org => {
      if (!org) {
        res.send('Organization not found.');
      }

      storeOrg = org;
      return Unit.find({organization: storeOrg._id, registered: true}, '_id')
    })
    .then(units => {
      const ids = _.map(units, '_id');
      return Fee.find({ paid_date: null, unit: {$in: ids} }, 'unit payments due_date amount')
        .populate('unit', '_id name')
        //.populate('payments', 'amount')
        .exec()
    })
    .then(fees => {
      res.json({
        success: true,
        contents: {
          orgName: storeOrg.name,
          fees
        }
      })
    })
})

router.get('/forUser/:user_id', (req, res) => {
  let ids = [ ];
  Organization.find({ director: req.params.user_id }, '_id')
    .then(orgs => {
      const ids = _.map(orgs, '_id');

      return Unit.find({ organization: {$in: ids} })
    })
    .then(units => {
      const ids = _.map(units, '_id');

      return Fee.find({ paid_date: null, unit: {$in: ids} })
        .populate('unit', 'name slug organization detailsUrl')
        .populate('unit.organization', 'name slug detailsUrl')
        .populate('category', 'name slug')
        .populate('payments')
        .sort('unit.name')
        .sort('due_date')
        .exec()
    })
    .then(fees => {
      res.json({
        success: true,
        contents: fees
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
  })

export default router;