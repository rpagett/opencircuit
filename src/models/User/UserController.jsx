import Express from 'express';
import User from './UserModel';
import validateUser from './UserValidation';

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
    User.findOne({ email: req.params.email }, '-password -hash -salt -createdAt -updatedAt')
      .then(user => {
        if (!user) {
          res.json({
            success: false,
            error: 'User not found.'
          })
        }
        else {
          res.json({
            success: true,
            user: user
          });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          error: err
        });
      });
  })
  .patch((req, res) => {
    console.log('Body is:', req.body);
    validateUser(req.body)
      .then(() => {
        res.json({
          success: true,
          teehee: true
        })
      })
      .catch((errors) => {
          res.json({
          success: false,
          errors
        })
      })
  });

export default router;