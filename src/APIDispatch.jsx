import Express from 'express';

import EventController from './models/Event/EventController';

let router = Express.Router();

router.use('/events/', EventController);

router.all('*', (req, res) => {
  res.status(404).send('Denied.');
});

export default router;