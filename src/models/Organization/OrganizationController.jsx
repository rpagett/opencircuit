import Express from 'express';
import _ from 'lodash';

import Unit from '../Unit/UnitModel'
import Organization from './OrganizationModel';
import validateOrganization from './OrganizationValidation';
import { UserRoles, userHasRole } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are '/api/organizations/...'

Organization.on('afterRemove', org => {
  Unit.findAndRemove({ organization: org._id })
    .exec();
})

router.route('/')
  .get(hasRole(UserRoles.Administrator), (req, res) => {
    let contents = [ ];
    let ids = [ ];

    Organization.find({ })
      .populate('director', 'first_name last_name middle_initial email')
      .exec()
      .then(orgs => {
        contents = orgs;

        orgs.map(org => {
          ids.push(org._id);
        })

        return Unit.aggregate([
          { $match: { registered: true } },
          { $project: { organization: 1 } },
          {
            $group: {
              _id: '$organization',
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
        })
      })
  })

router.route('/:slug')
  .get((req, res) => {
    Organization.findOne({ slug: req.params.slug })
      .populate('director', 'first_name last_name middle_initial email')
      .exec()
      .then(org => {
        res.json({
          success: true,
          model: org
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
    validateOrganization(req.body)
      .then(data => {
        Organization.findOneAndUpdate({ slug: req.params.slug }, data, {
            upsert: true,
            fields: 'slug detailsUrl'
          })
          .then(unit => {
            res.send({
              success: true,
              redirect: `/organizations/${req.params.slug}`
            })
          })
          .catch(err => {
            res.send({
              success: false,
              error: err.message
            })
          })
      });
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

router.route('/:slug/units')
  .get((req, res) => {
    Organization.findOne({ slug: req.params.slug }, '_id')
      .then(org => {
        return Unit.find({ organization: org._id })
          .populate('organization', 'name')
          .populate('unit_type', 'name')
          .populate('competition_class', 'name abbreviation')
          .populate('director', 'first_name middle_initial last_name email')
          .exec()
      })
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
  })

export default router;