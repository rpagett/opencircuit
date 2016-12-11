import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';
import Event from '../Event/EventModel';
import Unit from '../Unit/UnitModel';
import EventRegistration from '../Pivots/EventRegistrationModel';

let router = Express.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', hasRole(UserRoles.Administrator), (req, res) => {
  Unit.find({ registered: true }, 'name slug createdAt confirmed_paid_date')
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
  let registrations = [ ];

  Unit.find({ registered: true }, 'name slug competition_class director unit_type organization')
    .populate('competition_class', 'name abbreviation')
    .populate('director', 'first_name last_name mi email phone')
    .populate('unit_type', 'name')
    .populate('organization', 'name street street_2 city state zip')
    .exec()
    .then(resUnits => {
      units = resUnits;

      return EventRegistration.find({})
        .populate('unit', 'confirmed_paid_date')
        .populate('event', 'date')
        .exec()
    })
    .then(resRegistrations => {
      registrations = resRegistrations;

      return Event.find({ }, 'name attendance_cap date')
    })
    .then(resEvents => {
      let events = resEvents;
      for (let key in events) {
        const event = events[key].toObject();
        const attending = _.filter(registrations, ['event._id', event._id])
        console.log('attending', attending.length);

        const allUnits = _.sortBy(attending, reg => {
          if (reg.createdAt > reg.unit.confirmed_paid_date) {
            return reg.createdAt;
          }

          return reg.unit.confirmed_paid_date;
        });

        const paidUnits = _.filter(allUnits, reg => {
          return reg.unit.confirmed_paid_date != null;
        });
        const unpaidUnits = _.reject(allUnits, reg => {
          return reg.unit.confirmed_paid_date != null;
        });
        const confirmedUnits = _.slice(paidUnits, 0, event.attendance_cap);
        const waitlistUnits = _.slice(paidUnits, event.attendance_cap);

        events[key] = {
          ...event,
          confirmedUnits,
          waitlistUnits,
          unpaidUnits
        }
        console.log('Added event', event.name, confirmedUnits.length, '/', waitlistUnits.length, '/', unpaidUnits.length);
      }

      for (let key in units) {
        const unit = units[key].toObject();
        let attending = _.filter(registrations, ['unit._id', unit._id]);
        if (!attending) {
          continue;
        }

        attending = _.sortBy(attending, reg => { return reg.event.date });

        let eventList = [ ];
        attending.map(reg => {
          let status = 'Confirmed';

          const thisEvent = _.find(events, { _id: reg.event._id });
          if (_.find(thisEvent.waitlistUnits, ['unit._id', unit._id])) {
            status = 'Waitlist';
          }
          else if (_.find(thisEvent.unpaidUnits, ['unit._id', unit._id])) {
            status = 'Unpaid';
          }

          eventList.push(thisEvent.name + ' [' + status + ']');
        })

        //console.log('Event list is', eventList);
        units[key] = {
          ...unit,
          eventList: _.join(eventList, ', ')
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

router.get('/music', hasRole(UserRoles.Administrator), (req, res) => {
  Unit.find({ registered: true }, 'name director competition_class last_music_submission')
    .populate('competition_class', 'abbreviation')
    .populate('director', 'email first_name mi last_name')
    .sort('name')
    .exec()
    .then(units => {
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

router.get('/spiels', hasRole(UserRoles.Administrator), (req, res) => {
  Unit.find({ registered: true }, 'name director competition_class spiel')
    .populate('competition_class', 'abbreviation')
    .populate('director', 'email first_name mi last_name')
    .sort('name')
    .exec()
    .then(units => {
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