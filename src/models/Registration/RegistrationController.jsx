import Express from 'express';
import _ from 'lodash';

import Organization from '../Organization/OrganizationModel';
import Unit from '../Unit/UnitModel';
import validateOrganization from '../Organization/OrganizationValidation'
import validateUnit from '../Unit/UnitValidation';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are '/api/register/...'

router.post('/organization', (req, res) => {
  validateOrganization(req.body)
    .then(data => {
      //Organization.search({ query: data.slug }) This is where I'll do fuzzy matching.

      let org = new Organization(data);
      org.slug = data.slug;
      org.director = req.user;

      return org.save();
    })
    .then(org => {
      res.json({
        success: true,
        redirect: `/register/organization/${org._id}`
      })
    })
    .catch(errors => {
      res.json({
        success: false,
        errors
      })
    })
})

router.route('/organization/:org')
  .get((req, res) => {
    Organization.findOne({ _id: req.params.org }, 'name director')
      .then(org => {
        if (!org) {
          res.json({
            success: false,
            error: 'Organization not found.'
          })
        }

        if (org.director != req.user) {
          res.json({
            success: false,
            error: 'You are not authorized to register a unit for that organization.'
          })
        }

        res.json({
          success: true,
          model: org
        })
      })
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
  })

  .post((req, res) => {
    validateUnit(req.body)
      .then(data => {
        let unit = new Unit(data);

        unit.organization = req.params.org;
        unit.director = req.user;

        return unit.save()
      })
      .then(unit => {
        res.json({
          success: true,
          redirect: `/register/unit/${unit._id}`
        })
      })
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
  })

router.route('/unit/:unit')
  .get((req, res) => {
    Unit.findOne({ _id: req.params.unit }, 'name unit_type director')
      .then(unit => {
        if (!unit) {
          res.json({
            success: false,
            error: 'Unit not found.'
          })
        }

        if (!unit.director.equals(req.user._id)) {
          res.json({
            success: false,
            error: 'You are not authorized to edit this unit.'
          })
        }

        res.json({
          success: true,
          contents: {
            unit_type: unit.unit_type
          }
        })
      })
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
    })

  .post((req, res) => {
    console.log('Posting!');
    Unit.findOneAndUpdate({ id: req.params.unit }, {
      members: req.body.members,
      competition_class: req.body.competition_class,
      registered: true
    })
    .exec()
    .then(unit => {
      res.json({
        success: true,
        redirect: `/register/unit/${req.params.unit}/events`
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
})

router.post('/unit/:unit/events', (req, res) => {
  console.log(req.body);
  res.json({
    success: true,
    redirect: `/register/unit/${req.params.unit}/confirm`
  })
})

router.get('/unit/:unit/confirm', (req, res) => {
  Unit.findOne({ _id: req.params.unit }, 'organization')
    .then(unit => {
      res.json({
        success: true,
        contents: {
          organization: unit.organization.toString()
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

export default router;