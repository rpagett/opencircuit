import Express from 'express';
import _ from 'lodash';

import Organization from '../Organization/OrganizationModel';
import Unit from '../Unit/UnitModel';

import * as Validate from './RegistrationValidation';
import { UserRoles } from '../User/UserRoles';
import { fetchAPI } from '../../helpers/functions';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are '/api/register/...'

router.get('/orgList', (req, res) => {
  Organization.find({ director: req.user._id }, 'name')
    .then(orgs => {
      res.json({
        success: true,
        contents: orgs
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
    })
})

router.post('/organization', (req, res) => {
  Validate.organization(req.body)
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
    Validate.unit(req.body)
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
    Unit.findOne({ _id: req.params.unit }, 'name unit_type director organization')
      .populate('organization', 'is_school')
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
            unit_type: unit.unit_type,
            scholastic: unit.organization.is_school
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
    Validate.unitDetails(req.body)
      .then(data => {
        return Unit.findOneAndUpdate({ _id: req.params.unit }, {
          members: data.members,
          competition_class: data.competition_class,
          registered: true
        })
        .exec()
      })
      .then(unit => {
        res.json({
          success: true,
          redirect: `/register/unit/${req.params.unit}/events`
        })
      })
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
})

router.post('/unit/:unit/events', (req, res) => {
  fetchAPI(`/api/units/${req.params.unit}/events`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.user.apiToken
    },
    body: JSON.stringify({
      events: req.body.events
    })
  })
    .then(result => {
      res.json({
        success: true,
        redirect: `/register/unit/${req.params.unit}/confirm`
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      })
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