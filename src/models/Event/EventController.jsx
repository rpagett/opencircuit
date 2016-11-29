import Express from 'express';
import _ from 'lodash';

import Event from './EventModel';
import EventRegistration from '../Pivots/EventRegistrationModel';
import Unit from '../Unit/UnitModel'
import UnitType from '../UnitType/UnitTypeModel'
import User from '../User/UserModel'
import validateEvent from './EventValidation';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are '/api/events/...'

router.route('/')
  .get((req, res) => {
    let events = [ ];
    Event.find({ }, 'name slug detailsUrl date formattedDate attendance_cap')
      .sort('date')
      .exec()
      .then(resEvents => {
        events = resEvents;

        return EventRegistration.find({ })
          .populate('unit', 'confirmed_paid_date')
          .exec()
      })
      .then(registrations => {
        for (let key in events) {
          const event = events[key].toObject();
          const attending = _.filter(registrations, { event: event._id })
          let count = attending.length;

          if (attending.length > event.attendance_cap) {
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

            count = confirmedUnits.length + ' / ' + waitlistUnits.length + ' / ' + unpaidUnits.length;
          }

          events[key] = {
            ...event,
            unitCount: (count ? count : 0)
          }
        }

        res.json({
          success: true,
          contents: events
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        });
      })
  })

  .post(hasRole(UserRoles.EventDirector), (req, res) => {
    validateEvent(req.body)
      .then(data => {
        let event = new Event(data);
        event.slug = data.slug;

        return event.save();
      })
      .then(event => {
        res.json({
          success: true,
          redirect: event.detailsUrl
        })
      })
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
  })

  .delete(hasRole(UserRoles.Administrator), (req, res) => {
    Unit.findOneAndRemove({ slug: req.params.slug })
      .exec()
      .then( () => {
        res.json({
          success: true
        })
      })
      .catch( err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  });

router.get('/edit/:slug', (req, res) => {
  Event.findOne({ slug: req.params.slug })
    .then(event => {
      res.send({
        success: true,
        model: event
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
})

router.route('/:slug')
  .get((req, res) => {
    let event = { };
    Event.findOne({ slug: req.params.slug })
      .then(inEvent => {
        event = inEvent;

        if (!event) {
          throw new Error("That event does not exist.");
        }

        return EventRegistration.find({event: event._id})
          .populate('unit', 'slug name director unit_type confirmed_paid_date')
          //.populate('unit.director', 'first_name middle_initial last_name email')
          .populate('competition_class', 'name abbreviation')
          .exec()
      })
      .then(registrations => {
        return Unit.populate(registrations, [
          {
            path: 'unit.director',
            model: User,
            select: 'first_name middle_initial last_name email'
          },
          {
            path: 'unit.unit_type',
            model: UnitType,
            select: 'name'
          }
        ])
      })
      .then(registrations => {
        let confirmedUnits = [], unpaidUnits = [], waitlistUnits = [];

        if (registrations.length) {
          unpaidUnits = _.filter(registrations, reg => {
            return reg.unit.confirmed_paid_date == null;
          });

          confirmedUnits = _.filter(registrations, reg => {
            return reg.unit.confirmed_paid_date != null;
          })

          if (registrations.length >= event.attendance_cap) {
            const unitList = _.sortBy(confirmedUnits, reg => {
              if (reg.createdAt > reg.unit.confirmed_paid_date) {
                return reg.createdAt;
              }

              return reg.unit.confirmed_paid_date;
            })

            //console.log('SORTED', _.map(unitList, reg => reg.unit.name));

            confirmedUnits = _.slice(unitList, 0, event.attendance_cap);
            waitlistUnits = _.slice(unitList, event.attendance_cap);
          }

          confirmedUnits = _.sortBy(confirmedUnits, ['unit.unit_type', 'competition_class.abbreviation'])
        }

        res.json({
          success: true,
          model: {
            ...event.toObject(),
            confirmedUnits,
            waitlistUnits,
            unpaidUnits
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

  .patch(hasRole(UserRoles.EventDirector), (req, res) => {
    validateEvent(req.body)
      .then(data => {
        const fillableData = _.pick(data, Event.fillableFields());
        Event.findOneAndUpdate({ slug: data.slug }, fillableData, {
            fields: 'slug detailsUrl'
          })
          .then(data => {
            res.send({
              success: true,
              redirect: data.detailsUrl
            })
          })
          .catch(err => {
            console.log('ERRORS', err);
          })
      })
      .catch(errors => {
        console.log('OTHER ERRORS', errors);
        res.json({
          success: false,
          errors
        })
      })
  })

  .delete(hasRole(UserRoles.Administrator), (req, res) => {
    Event.findOneAndRemove({ slug: req.params.slug })
      .exec()
      .then( () => {
        res.json({
          success: true
        })
      })
      .catch( err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  });

// :type is a UnitType _id
router.get('/by_type/:type', (req, res) => {
  Event.find({ }, '_id name date registration_closed date')
  //Event.find({ types_allowed: req.params.type }, '_id name')
    .sort('date')
    .exec()
    .then(events => {
      res.json({
        success: true,
        events
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