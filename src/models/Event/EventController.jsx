import Express from 'express';

let router = Express.Router();
// All routes are '/events/...'

router.get('/', (req, res) => {
  res.send(EventRepository.all());
});

export default router;