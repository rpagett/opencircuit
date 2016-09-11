import Express from 'express';
import _ from 'lodash';
import uuid from 'node-uuid';

import * as UserEmail from './UserEmails';
import * as Email from '../../helpers/mail';

import User from './UserModel';
import validateUser from './UserValidation';
import { UserRoles } from './UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// routes are '/api/users/...'

router.get('/', hasRole(UserRoles.Administrator), (req, res) => {
  User.find({ }, 'email first_name mi last_name formattedName profileUrl phone')
    .sort('last_name')
    .exec()
    .then(users => {
      res.json({
        success: true,
        contents: users
      });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
      });
    })
});

router.get('/select', (req, res) => {
  User.find({ }, 'first_name mi last_name')
    .then(users => {
      let json = [ ];
      users.map(user => {
        json.push({
          value: user._id.toString(),
          label: user.formattedName
        });
      })

      res.json(json);
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message
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

  .patch(userOrAdmin(), (req, res) => {
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
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
  });

router.route('/:email/roles')
  .get(hasRole(UserRoles.Administrator), (req, res) => {
    User.findOne({ email: req.params.email }, 'roles')
      .then(user => {
        if (!user) {
          throw new Error('That user does not exist.');
        }

        let userRoles = { };
        for (let key of user.roles) {
          userRoles[key] = true;
        }

        res.json({
          success: true,
          model: {
            _id: user._id,
            ['roles[]']: userRoles
          }
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      });
  })

  .patch(hasRole(UserRoles.Administrator), (req, res) => {
    const inRoles = req.body['roles[]'];
    console.log(inRoles);

    let userRoles = [ ];
    Object.keys(inRoles).forEach((key, index) => {
      if (inRoles[key] === true) {
        userRoles.push(key);
      }
    });

    console.log('Final', userRoles);
    User.findOneAndUpdate({ email: req.params.email }, {
      roles: userRoles
    })
      .then(user => {
        res.json({
          success: true
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  });

export default router;