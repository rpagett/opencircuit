import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';
import Unit from '../Unit/UnitModel';
import EventRegistration from '../Pivots/EventRegistrationModel';

let router = Express.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', hasRole(UserRoles.Administrator), (req, res) => {
  Unit.find({ registered: true }, 'name slug createdAt')
    .sort('createdAt')
    .exec()
    .then(units => {
      res.json({
        success: true,
        contents: units
      })
    })
});

router.get('/drawstatus', hasRole(UserRoles.Administrator), (req, res) => {
  Unit.find({ registered: true }, 'name confirmed_paid_date director')
    .populate('director', 'first_name mi last_name')
    .exec()
    .then(units => {
      for (let key in units) {
        const unit = units[key].toObject();

        if (unit.confirmed_paid_date) {
          units[key] = {
            ...unit,
            paymentStatus: 'Received',
            paymentClass: 'cell-green'
          }
        }
        else {
          units[key] = {
            ...unit,
            paymentStatus: 'Awaiting',
            paymentClass: 'cell-red'
          }
        }
      }

      units.sort((a, b) => {
        if (a.paymentStatus == b.paymentStatus) {
          return a.name.localeCompare(b.name);
        }

        return a.paymentStatus.localeCompare(b.paymentStatus);
      })

      res.json({
        success: true,
        contents: units
      })
    })
});

router.get('/mailchimp', (req, res) => {
  let units = [ ];

  Unit.find({ registered: true }, 'name slug competition_class director unit_type organization')
    .populate('competition_class', 'name abbreviation')
    .populate('director', 'first_name last_name mi email')
    .populate('unit_type', 'name')
    .populate('organization', 'name street street_2 city state zip')
    .exec()
    .then(resUnits => {
      units = resUnits;

      return EventRegistration.aggregate([
        { $lookup: {from: 'events', localField: 'event', foreignField: '_id', as: 'event'} },
        { $group: {
            _id: '$unit',
            events: { $push: { name: '$event.name' } }
          }
        }
      ])
    })
    .then(agg => {
      for (let key in units) {
        const unit = units[key].toObject();
        const line = _.find(agg, { _id: unit._id })

        if (!line) { continue; }
        units[key] = {
          ...unit,
          eventList: _.join(_.map(line.events, 'name'), ', ')
        }
      }

      res.send({
        success: true,
        contents: units
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
})

export default router;