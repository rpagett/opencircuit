import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';
import Unit from '../Unit/UnitModel';

let router = Express.Router();
// All routes are '/api/spiels/...'

router.route('/')
  .get(hasRole(UserRoles.EventDirector), (req, res) => {
    Unit.find({ registered: true }, 'name slug director spiel')
      .sort('name')
      .populate('director', 'first_name mi last_name email')
      // .populate('spiel')
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

router.get('/user/:id', (req, res) => {
  Unit.find({ director: req.params.id }, 'name slug spiel')
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

router.route('/:slug')
  .get((req, res) => {
    Unit.findOne({ slug: req.params.slug }, 'name slug spiel organization')
      // .populate('spiel')
      .populate('organization', 'city state')
      .exec()
      .then(unit => {
        if (!unit) {
          throw new Error('Unit not found.')
        }

        const spiel = (unit.spiel ? unit.spiel : { });
        const { unit_name, show_title, directors, age_outs } = spiel;

        res.send({
          success: true,
          model: {
            unit_name,
            show_title,
            directors,
            age_outs,
            name: unit.name,
            city: unit.organization.city,
            state: unit.organization.state
          }
        })
      })
      .catch(err => {
        res.send({
          success: false,
          error: err.message
        })
      })
  })
  .patch((req, res) => {
    Unit.findOne({ slug: req.params.slug }, 'spiel')
      .then(unit => {
        if (!unit) {
          throw new Error('Unit not found.');
        }

        unit.spiel = (unit.spiel ? unit.spiel : { });

        unit.spiel.unit_name = req.body.unit_name;
        unit.spiel.show_title = req.body.show_title;
        unit.spiel.directors = req.body.directors;
        unit.spiel.age_outs = req.body.age_outs;

        return unit.save()
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

export default router;