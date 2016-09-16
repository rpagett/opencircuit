import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

import Unit from '../Unit/UnitModel';
import CompClass from '../CompClass/CompClassModel';
import UnitType from './UnitTypeModel';
import validateUnitType from './UnitTypeValidation';

let router = Express.Router();
// All routes are /api/unittypes/

router.route('/')
  .get((req, res) => {
    UnitType.find({ }, '_id name')
      .sort('name')
      .exec()
      .then(types => {
        res.json({
          success: true,
          contents: types
        })
      })
  })

  .post(hasRole(UserRoles.Administrator), (req, res) => {
    validateUnitType(req.body)
      .then(data => {
        let type = new UnitType(data);

        return type.save();
      })
      .then(type => {
        res.json({
          success: true,
          redirect: '/unittypes/new'
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
  UnitType.find({ }, '_id name slug detailsUrl')
    .sort('name')
    .exec()
    .then(types => {
      let ids = [];

      contents = types;
      types.map(type => {
        ids.push(type._id);
      })

      return Unit.aggregate([
        { $match: { registered: true } },
        { $project: { unit_type: 1 } },
        //{ $unwind: '$tokens' } /* this converts arrays into unique documents for counting */
        {
          $group: {
            _id: '$unit_type',
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

router.get('/select', (req, res) => {
  console.log('KNOCK KNOCK');
  UnitType.find({ }, '_id name')
    .sort('name')
    .exec()
    .then(types => {
      let json = [ ];
      types.map(type => {
        json.push({
          value: type._id.toString(),
          label: type.name
        });
      })

      res.json(json);
    })
});

router.route('/:slug')
  .get((req, res) => {
    UnitType.findOne({ slug: req.params.slug })
      .then(type => {
        if (!type) {
          throw new Error("That unit type does not exist.");
        }

        res.json({
          success: true,
          model: type
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
    validateUnitType(req.body)
      .then(data => {
        UnitType.findOneAndUpdate({ slug: req.params.slug }, { name: data.name }, {
            fields: 'slug detailsUrl'
          })
          .then(type => {
            res.send({
              success: true,
              redirect: type.detailsUrl
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
    UnitType.findOneAndRemove({ slug: req.params.slug })
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
    UnitType.findOne({ slug: req.params.slug }, '_id')
      .then(type => {
        if (!type) {
          throw new Error('Unit type does not exist.')
        }

        return Unit.find({ unit_type: type }, '_id name slug competition_class unit_type director')
          .populate('unit_type', 'name')
          .populate('competition_class', 'abbreviation')
          .populate('director', 'first_name last_name formattedName email profileUrl')
          .sort('name')
          .exec();
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

router.get('/:type/classes(/:scholastic)?', (req, res) => {
  console.log('KNOCK KNOCK');
  let query = CompClass.find({ unit_type: req.params.type }, '_id name abbreviation')
    .sort('name');

  if (req.params.scholastic === 'scholastic') {
    query.where('scholastic').equals(true);
  }
  else {
    query.where('scholastic').equals(false);
  }

  query.exec()
    .then(classes => {
      let json = [ ];
      classes.map(compclass => {
        json.push({
          value: compclass._id.toString(),
          label: compclass.name + ' (' + compclass.abbreviation.toUpperCase() + ')'
        });
      })

      res.json(json);
    })
});

router.get('/seed', (req, res) => {
  let type = new UnitType({
    slug: 'guard',
    name: 'Guard'
  });

  type.save()
    .then(() => {
      type = new UnitType({
        slug: 'percussion',
        name: 'Percussion'
      });

      return type.save();
    })
    .then(() => {
      type = new UnitType({
        slug: 'winds',
        name: 'Winds'
      });

      return type.save();
    })
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(err => {
      res.json({
        error: err.message
      });
    })
});

export default router;