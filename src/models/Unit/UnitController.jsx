import Express from 'express';
import _ from 'lodash';

import Unit from './UnitModel';
import EventRegistration from '../Pivots/EventRegistrationModel';

let router = Express.Router();
// All routes are /api/units/

router.route('/')
  .get((req, res) => {
    Unit.find({ registered: true }, '_id name slug unit_type competition_class director')
      .populate('unit_type', 'name')
      .populate('competition_class', 'abbreviation')
      .populate('director', 'first_name last_name formattedName email profileUrl')
      .sort('unit_type.name name')
      .exec()
      .then(units => {
        res.json({
          success: true,
          contents: units
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  });

// Mostly just for the registration flow / event modal
router.get('/:id/events', (req, res) => {
  EventRegistration.find({ unit: req.params.id }, 'event')
    .then(registrations => {
      res.json({
        success: true,
        model: {
          events: _.map(registrations, 'events')
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

router.post('/:id/events', (req, res) => {
  const inEvents = Object.keys(req.body.events);
  console.log('IN EVENTS', inEvents);

  let unit = { };
  let addEvents = [ ];

  Unit.find({ _id: req.params.id }, 'competition_class')
    .then(res_unit => {
      if (!res_unit) {
        throw new Error('Unit not found.');
      }

      unit = res_unit;

      return EventRegistration.find({unit: unit._id}, 'event')
    })
    .then(registrations => {
      const registeredEvents = _.map(registrations, 'event');
      console.log('Registered Events', registeredEvents);

      addEvents = _.difference(inEvents, registeredEvents);

      const removeEvents = _.difference(registeredEvents, inEvents);
      console.log('Removing events', removeEvents);

      return EventRegistration.remove({ unit: unit._id, event: {$in: removeEvents }})
    })
    .then(() => {
      let creation = [ ];
      addEvents.each(ev => {
        creation.push({
          event: ev,
          unit: unit._id,
          competition_class: unit.competition_class
        })
      })

      console.log('Adding events', addEvents);
      return EventRegistration.create(creation)
    })
    .then(() => {
      res.json({
        success: true
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