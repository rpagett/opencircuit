import Express from 'express';
import User from './UserModel';

let router = Express.Router();
// routes are '/api/users/...'

router.get('/', (req, res) => {
  User.find({ }, 'email first_name mi last_name formattedName profileLink emailLink phone')
    .then((users) => {
      res.json({
        success: true,
        users: users
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err
      });
    })
});

router.route('/:email')
  .get((req, res) => {
    User.findOne({ email: req.params.email }, '-password -hash -salt')
      .then(user => {
        res.json({
          success: true,
          user: user
        });
      })
      .catch(err => {
        res.json({
          success: false,
          error: err
        });
      });
  });

export default router;