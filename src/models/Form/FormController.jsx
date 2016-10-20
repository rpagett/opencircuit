import Express from 'express';
import _ from 'lodash';

import { Form, FormObligation } from './FormModel';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();



export default router;