import Express from 'express';
import _ from 'lodash';

import { UserRoles, userHasRole } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are '/api/organizations/...'

router.get('/', hasRole(UserRoles.Administrator), (req, res) => {

})


export default router;