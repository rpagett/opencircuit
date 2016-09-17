import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

import Judge from './JudgeModel';

let router = Express.Router();
// All routes are /api/judges/

router.route('/')
  .get((req, res) => {
    Judge.find({ }, '_id first_name middle_initial last_name email phone city state')
      .sort('last_name')
      .exec()
      .then(judges => {
        res.json({
          success: true,
          contents: judges
        })
      })
  })

export default router;