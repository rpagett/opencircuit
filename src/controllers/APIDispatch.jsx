import Express from 'express';

import EventController from './EventController';

let router = Express.Router();

router.use('/events/', EventController);

router.all('*', (req, res) => {
  res.status(404).send('Denied.');
});

export default router;