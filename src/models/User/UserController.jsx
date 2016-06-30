import Express from 'express';
import _ from 'lodash';

import User from './UserModel';
import validateUser from './UserValidation';

let router = Express.Router();
// routes are '/api/users/...'

router.get('/', (req, res) => {
  User.find({ }, 'email first_name mi last_name formattedName profileURL phone')
    .then(users => {
      res.json({
        success: true,
        contents: users
      });
    })
    .catch(err => {
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
          throw new Error('That user does not exist.');
        }
        else {
          res.json({
            success: true,
            model: user
          });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        });
      });
  })

  .patch((req, res) => {
    console.log('Body is:', req.body);
    validateUser(req.body)
      .then(data => {
        if (req.params.email != data.email) {
          throw [{field: 'email', message: 'There was an authorization error.'}];
        }

        const fillableData = _.pick(data, User.fillableFields());
        User.findOneAndUpdate({ email: data.email }, fillableData, {
          fields: 'email'
        })
        .then(data => {
          res.send({
            success: true,
            redirect: `/users/${data.email}`
          })
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