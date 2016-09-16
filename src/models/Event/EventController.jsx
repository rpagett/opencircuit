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
    let contents = [ ];
    Event.find({ }, 'name slug detailsUrl date formattedDate attendance_cap')
      .sort('date')
      .exec()
      .then(events => {
        contents = events;

        let ids = [ ];
        events.map(event => {
          ids.push(event._id);
        })

        return EventRegistration.aggregate([
          { $match: { event: {$in: ids} } },
          { $project: { event: 1} },
          {
            $group: {
              _id: '$event',
              count: { $sum: 1 }
            }
          }
        ])
      })
      .then(counts => {
        for (let key in contents) {
          contents[key] = contents[key].toObject();
          let count = _.find(counts, { _id: contents[key]._id });

          contents[key] = {
            ...contents[key],
            unitCount: (count ? count.count : 0)
          }
        }

        res.json({
          success: true,
          contents
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
    console.log('Body is', req.body);
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
        console.log('We\'re in catch.', errors);
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

        if (registrations) {
          unpaidUnits = _.filter(registrations, reg => {
            return reg.unit.confirmed_paid_date == null;
          });
          console.log('Unpaid units', unpaidUnits);

          confirmedUnits = _.filter(registrations, reg => {
            return reg.unit.confirmed_paid_date != null;
          })

          if (registrations.length >= event.attendance_cap) {
            const unitList = _.sortBy(confirmedUnits, reg => {
              return reg.unit.confirmed_paid_date;
            })

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
  Event.find({ }, '_id name date')
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