import Express from 'express';

import EventController from './UserController';

let router = Express.router();

router.use('/events/', EventController);

router.all('*', (req, res) => {
  res.status(404).send('Denied.');
});

export default router;