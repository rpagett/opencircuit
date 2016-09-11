import Express from 'express';
import _ from 'lodash';

import CompClass from './CompClassModel';
import validateCompClass from './CompClassValidation';

import Unit from '../Unit/UnitModel';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are /api/compclasses/

const GUARD_TYPE = '579000db0Oceff06c51ae377';
const WINDS_TYPE = '579000db0fceff06c51ae379';

router.route('/')
  .get((req, res) => {
    CompClass.find({ }, 'name abbreviation unit_type')
      .populate('unit_type', 'name slug detailsUrl')
      .sort('unit_type')
      .exec()
      .then(classes => {
        res.json({
          success: true,
          contents: classes
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })

  .post(hasRole(UserRoles.Administrator), (req, res) => {
    validateCompClass(req.body)
      .then(data => {
        let compclass = new CompClass(data);

        return compclass.save();
      })
      .then(compclass => {
        res.json({
          success: true,
          redirect: '/compclasses/new'
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

router.get('/table', (req, res) => {
  let contents = { };
  CompClass.find({ }, '_id name abbreviation unit_type detailsUrl')
    .populate('unit_type', 'name')
    .sort('unit_type name')
    .exec()
    .then(classes => {
      let ids = [];

      contents = classes;
      classes.map(compclass => {
        ids.push(compclass._id);
      })

      return Unit.aggregate([
        { $match: { registered: true } },
        { $project: { competition_class: 1 } },
        {
          $group: {
            _id: '$competition_class',
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

router.route('/:abbreviation')
  .get((req, res) => {
    CompClass.findOne({ abbreviation: req.params.abbreviation }, 'name abbreviation')
      .then(compclass => {
        if (!compclass) {
          throw new Error('That competitive class does not exist.');
        }

        res.json({
          success: true,
          model: compclass
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })

  .patch(hasRole(UserRoles.Administrator), (req, res) => {
    validateCompClass(req.body)
      .then(data => {
        CompClass.findOneAndUpdate({ abbreviation: data.abbreviation }, data, {
            fields: 'abbreviation detailsUrl'
          })
          .then(compclass => {
            res.send({
              success: true,
              redirect: compclass.detailsUrl
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

router.route('/:id/units')
  .get((req, res) => {
    Unit.find({ registered: true, competition_class: req.params.id }, '_id name slug organization unit_type competition_class director')
      .populate('organization', 'name detailsUrl')
      .populate('unit_type', 'name')
      .populate('competition_class', 'name abbreviation')
      .populate('director', 'first_name last_name formattedName email profileUrl')
      .sort('name')
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
  })

router.get('/seed', (req, res) => {
  let compclass = new CompClass({
    abbreviation: 'SA',
    name: 'Scholastic A',
    unit_type: GUARD_TYPE
  });

  compclass.save()
    .then(() => {
      compclass = new CompClass({
        abbreviation: 'WSA',
        name: 'Winds Scholastic A',
        unit_type: WINDS_TYPE
      });
      compclass.save();
    })
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(() => {
      res.json({
        success: false
      })
    })
})

export default router;