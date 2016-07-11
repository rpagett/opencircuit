import Express from 'express';
import _ from 'lodash';

import Event from './EventModel';
import validateEvent from './EventValidation';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are '/api/events/...'

router.route('/')
  .get((req, res) => {
    Event.find({ }, 'name slug detailsUrl date formattedDate attendance_cap')
      .sort('date')
      .exec()
      .then(events => {
        res.json({
          success: true,
          contents: events
        });
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
  });

router.route('/:slug')
  .get((req, res) => {
    Event.findOne({ slug: req.params.slug })
      .then(event => {
        if (!event) {
          throw new Error("That event does not exist.");
        }

        res.json({
          success: true,
          model: event
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

export default router;