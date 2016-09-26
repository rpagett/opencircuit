import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';
import Unit from '../Unit/UnitModel';

let router = Express.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', (req, res) => {
  Unit.find({ registered: true }, 'name slug createdAt')
    .sort('createdAt')
    .exec()
    .then(units => {
      res.json({
        success: true,
        contents: units
      })
    })
});

export default router;