import Express from 'express';

import EventController from './models/Event/EventController';
import UserController from './models/User/UserController';

let router = Express.Router();

router.use('/events/', EventController);
router.use('/users/', UserController);

router.all('*', (req, res) => {
  res.status(404).send('Denied.');
});

export default router;