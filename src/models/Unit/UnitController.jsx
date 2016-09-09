import Express from 'express';
import _ from 'lodash';

import Unit from './UnitModel';
import EventRegistration from '../Pivots/EventRegistrationModel';

let router = Express.Router();
// All routes are /api/units/

router.route('/')
  .get((req, res) => {
    Unit.find({ registered: true }, '_id name slug organization unit_type competition_class director')
      .populate('organization', 'name detailsUrl')
      .populate('unit_type', 'name')
      .populate('competition_class', 'name abbreviation')
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

router.get('/select', (req, res) => {
  Unit.find({ registered: true }, '_id name')
    .then(units => {
      let json = [ ];
      units.map(unit => {
        json.push({
          value: unit._id.toString(),
          label: unit.name
        });
      })

      res.json(json);
    })
})

router.route('/:slug')
  .get((req, res) => {
    Unit.findOne({ slug: req.params.slug })
      .populate('organization', 'name slug detailsUrl is_school')
      .populate('unit_type', 'name')
      .populate('competition_class', 'name abbreviation formattedName')
      .populate('director', 'first_name last_name formattedName email profileUrl')
      .exec()
      .then(unit => {
        res.json({
          success: true,
          model: unit
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })
  .patch((req, res) => {
    Unit.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      upsert: true,
      fields: 'slug detailsUrl'
    })
    .then(unit => {
      res.send({
        success: true,
        redirect: `/units/${req.params.slug}`
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
  })

// Mostly just for the registration flow / event modal
router.route('/:id/events')
  .get((req, res) => {
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

  .post((req, res) => {
    console.log('BODY', req.body);
    const inEvents = Object.keys(req.body.events);
    console.log('IN EVENTS', inEvents);

    let unit = { };
    let addEvents = [ ];

    Unit.findOne({ _id: req.params.id }, 'competition_class')
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

        EventRegistration.remove({ unit: unit._id, event: {$in: removeEvents } }).exec()

        let creation = [ ];
        addEvents.forEach(ev => {
          creation.push({
            event: ev,
            unit: unit._id,
            competition_class: unit.competition_class
          })
        })

        console.log('Adding events', addEvents);
        return EventRegistration.create(creation).exec()
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