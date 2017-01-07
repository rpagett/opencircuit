import Express from 'express';
import _ from 'lodash';

import { hasRole } from '../../middleware/authRoute';
import { userHasRole, UserRoles } from '../User/UserRoles';

import CompClass from '../CompClass/CompClassModel';
import Event from '../Event/EventModel';
import EventRegistration from '../Pivots/EventRegistrationModel';
import Fee from '../Fee/FeeModel';
import Unit from './UnitModel';

let router = Express.Router();
// All routes are /api/units/

Unit.on('afterRemove', unit => {
  EventRegistration.remove({ unit: unit._id })
    .exec();
})

function updateEvents(id, events) {
  let inEvents = [ ];

  for (let key in events) {
    if (events[key]) {
      inEvents.push(key);
    }
  }

  //const inEvents = Object.keys(events);

  let unit = { };
  let addEvents = [ ];

  return Unit.findOne({ _id: id }, 'competition_class')
    .then(res_unit => {
      if (!res_unit) {
        throw new Error('Unit not found.');
      }

      unit = res_unit;

      return EventRegistration.find({unit: unit._id}, 'event')
    })
    .then(registrations => {
      const registeredEvents = _.map(registrations, 'event');

      addEvents = _.differenceBy(inEvents, registeredEvents, String);

      const removeEvents = _.differenceBy(registeredEvents, inEvents, String);

      EventRegistration.remove({ unit: unit._id, event: {$in: removeEvents } }).exec()

      let creation = [ ];
      addEvents.forEach(ev => {
        creation.push({
          event: ev,
          unit: unit._id,
          competition_class: unit.competition_class
        })
      })

      return EventRegistration.create(creation)
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
}

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
      .populate('unit_type', 'name slug')
      .populate('competition_class', 'name abbreviation formattedName')
      .populate('director', 'first_name last_name mi formattedName email profileUrl')
      .exec()
      .then(unit => {
        res.json({
          success: true,
          model: unit
        })
      })
      .catch(err => {
        console.error(err);
        res.json({
          success: false,
          error: err.message
        })
      })
  })

  .patch((req, res) => {
    Unit.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      upsert: true,
      fields: '_id slug detailsUrl'
    })
    .then(unit => {
      return updateEvents(unit._id, req.body.events);
    })
    .then( () => {
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

  .delete(hasRole(UserRoles.Administrator), (req, res) => {
    Unit.findOneAndRemove({ slug: req.params.slug })
      .exec()
      .then(unit => {
        EventRegistration.remove({ unit: unit._id }).exec();
        return Fee.remove({ unit: unit._id }).exec()
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
  });

router.get('/forUser/:id', (req, res) => {
  Unit.find({ director: req.params.id }, '_id name slug organization unit_type competition_class director last_music_submission spiel')
    .populate('organization', 'name detailsUrl')
    .populate('unit_type', 'name slug')
    .populate('competition_class', 'name abbreviation')
    .populate('director', 'first_name last_name formattedName email profileUrl')
    .sort('unit_type.name name')
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
    updateEvents(req.params.id, req.body.events)
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

router.get('/:slug/eventChecks', (req, res) => {
  let type = '';
  let storeRegistrations = [ ]
  Unit.findOne({ slug: req.params.slug }, '_id type')
    .then(unit => {
      type = unit.unit_type;
      return EventRegistration.find({ unit: unit._id }, 'event')
    })
    .then(registrations => {
      storeRegistrations = registrations;

      return Event.find({ /*types_allowed: type*/ }, '_id name slug date registration_closed')
        .sort('date')
        .exec()
    })
    .then(events => {
      let outEvents = [ ];

      for (let key in events) {

        const event = events[key].toObject();
        const isAttending = (_.find(storeRegistrations, ['event', event._id]) ? true : false)

        outEvents[key] = {
          ...event,
          attending: isAttending
        }
      }


      res.json({
        success: true,
        events: outEvents
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
})

router.get('/:slug/attending', (req, res) => {
  let contents = [ ];
  let unit = { };
  let inEvents = [ ];
  let allRegistrations = [ ];

  Unit.findOne({ slug: req.params.slug }, '_id confirmed_paid_date')
    .then(inUnit => {
      unit = inUnit;
      //console.log('unit is', unit);

      return EventRegistration.find({ unit: {$ne: null} })
        .populate('unit', '_id slug name confirmed_paid_date director')
        .populate('competition_class', 'name abbreviation')
        .exec()
    })
    .then(registrations => {
      allRegistrations = _.groupBy(registrations, 'event');

      return Event.find({ _id: {$in: Object.keys(allRegistrations)}}, 'name slug date attendance_cap critique_closed')
        .sort('date');
    })
    .then(events => {
      for (let key in events) {
        const event = events[key];

        let status = 'Confirmed';
        //console.log('all registrations', allRegistrations);
        //console.log('this event', allRegistrations[event._id])
        let unitList = allRegistrations[event._id];
        //let unitList = _.map(allRegistrations[event._id], reg => reg.unit);
        //console.log('unitList', unitList);
        let unitKey = _.findKey(unitList, reg => reg.unit.id == unit.id)
        //console.log('key', unitKey);

        if (!unitKey && unitKey !== 0) { console.log('cnting'); continue; }
        let found = unitList[unitKey];

        //console.log('obj at unitkey', unitKey, unitList[unitKey]);

        if (unit.confirmed_paid_date) {
          if (unitList.length >= event.attendance_cap) {
            let paidUnits = _.filter(unitList, reg => {
              return reg.unit.confirmed_paid_date != null;
            });

            paidUnits = _.sortBy(paidUnits, reg => {
              if (reg.createdAt > reg.unit.confirmed_paid_date) {
                return reg.createdAt;
              }

              return reg.unit.confirmed_paid_date;
            });

            //console.log('Paid Units', _.map(paidUnits, reg => reg.unit.name));

            unitKey = _.findKey(paidUnits, reg => reg.unit.id == unit.id)
            found = paidUnits[unitKey];
            console.log('Key for event', event.name, 'is', unitKey, '. Cap is', event.attendance_cap);

            if (parseInt(unitKey) + 1 > event.attendance_cap) {
              status = 'On Waitlist';
            }
          }
        }
        else {
          status = 'Owes Fees'
        }

        //const found = _.find(allRegistrations[event._id], reg => { return reg.unit.id == unit.id });
        //console.log('found', found);

        contents.push({
          ...event.toObject(),
          status,
          competition_class: found.competition_class.formattedName,
          found
        })
      }

      res.json({
        success: true,
        contents
      })
    })
    //.then(registrations => {
      //console.log('registrations/show', registrations);
    //  const events = _.map(registrations, 'event');
    //  //console.log('events/show', events);
    //  return Event.find({ _id: {$in: events} }, 'name slug date attendance_cap')
    //})
    //.then(events => {
    //  console.log('fetched events/show', events);
    //  res.json({
    //    success: true,
    //    contents: events
    //  })
    //})
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
})

router.route('/:slug/music')
  .patch((req, res) => {
    Unit.findOneAndUpdate({ slug: req.params.slug }, { last_music_submission: Date.now() })
      .then(unit => {
        res.send({
          success: true
        })
      })
      .catch(err => {
        res.send({
          success: false,
          error: err.message
        })
      })
  })

router.patch('/:id/reclassify', hasRole(UserRoles.Administrator), (req, res) => {
  Unit.findOne({ _id: req.params.id }, 'competition_class')
    .then(unit => {
      if (!unit) {
        throw new Error('Unit does not exist.');
      }
      unit.competition_class = req.body.compclass;
      return unit.save();
    })
    .then(unit => {
      return Event.find({ date: {$gt: Date.now()} }, '_id')
    })
    .then(events => {
      return EventRegistration.update({
        event: {$in:  _.map(events, '_id') },
        unit: req.params.id
      }, { competition_class: req.body.compclass }, { multi: true });
    })
    .then( () => {
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

router.route('/:slug/critique/:event')
  .post((req, res) => {
    Unit.findOne({ slug: req.params.slug }, '_id')
      .then(unit => {
        return EventRegistration.findOne({ unit: unit._id, event: req.params.event })
      })
      .then(reg => {
        if (!reg) {
          throw new Error('No event registration found.');
        }

        reg.attending_critique = true;
        return reg.save();
      })
      .then(() => {
        res.send({
          success: true
        })
      })
      .catch(err => {
        res.send({
          success: false,
          error: err.message
        })
      })
  })

  .delete((req, res) => {
    Unit.findOne({ slug: req.params.slug }, '_id')
      .then(unit => {
        return EventRegistration.findOne({ unit: unit._id, event: req.params.event })
      })
      .then(reg => {
        if (!reg) {
          throw new Error('No event registration found.');
        }

        reg.attending_critique = false;
        return reg.save();
      })
      .then(() => {
        res.send({
          success: true
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