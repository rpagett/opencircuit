import Express from 'express';

import CompClassController from './models/CompClass/CompClassController';
import EventController from './models/Event/EventController';
import FeeController from './models/Fee/FeeController';
import FeeCategoryController from './models/FeeCategory/FeeCategoryController';
import OrganizationController from './models/Organization/OrganizationController';
import RegistrationController from './models/Registration/RegistrationController';
import SupportController from './models/Support/SupportController';
import UnitController from './models/Unit/UnitController';
import UnitTypeController from './models/UnitType/UnitTypeController';
import UserController from './models/User/UserController';

let router = Express.Router();

router.use('/compclasses/', CompClassController);
router.use('/events/', EventController);
router.use('/fees/', FeeController);
router.use('/feecategories/', FeeCategoryController);
router.use('/organizations/', OrganizationController);
router.use('/register/', RegistrationController);
router.use('/support/', SupportController);
router.use('/units/', UnitController);
router.use('/unittypes/', UnitTypeController);
router.use('/users/', UserController);

router.all('*', (req, res) => {
  res.status(404).send('Denied.');
});

export default router;