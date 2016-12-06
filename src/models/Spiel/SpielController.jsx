import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';
import Unit from '../Unit/UnitModel';
import Spiel from './SpielSchema';

let router = Express.Router();
// All routes are '/api/spiels/...'


export default router;