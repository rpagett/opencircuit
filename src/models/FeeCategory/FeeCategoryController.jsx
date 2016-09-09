import Express from 'express';
import _ from 'lodash';

import FeeCategory from '../FeeCategory/FeeCategoryModel'

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are /api/feecategories/

router.route('/')
  .get((req, res) => {
    FeeCategory.find({ }, 'name slug')
      .then(categories => {
        res.json({
          success: true,
          contents: categories
        })
      })
  })

router.get('/select', (req, res) => {
  FeeCategory.find({ }, 'name slug')
    .then(categories => {
      let json = [ ];
      categories.map(unit => {
        json.push({
          value: unit.slug,
          label: unit.name
        });
      })

      res.json(json);
    })
})


export default router;