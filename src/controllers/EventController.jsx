import Express from 'express';

import EventRepository from '../repositories/EventRepository';

let router = Express.Router();

router.get('/', (req, res) => {
  res.send(EventRepository.all());
});

export default router;