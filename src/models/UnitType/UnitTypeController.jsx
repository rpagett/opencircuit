import Express from 'express';

import UnitType from './UnitTypeModel';

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