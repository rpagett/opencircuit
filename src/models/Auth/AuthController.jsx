import Express from 'express';
import Indicative from 'indicative';
import _ from 'lodash';

import User from '../User/UserModel';
import { loginUser, logoutUser } from './AuthActions';
import validateUser from '../User/UserValidation';
import { translateValidationErrors } from '../../helpers/functions'

let router = Express.Router();
// All routes are '/auth/...'

router.post('/login', (req, res) => {
  User.authenticate()(req.body.email, req.body.password, (err, user, options) => {
    if (err || !user) {
      res.send({
        success: false,
        errors: [{field: 'email', message: options.message}],
      });
    }
    else {
      req.login(user, function (err) {
        res.send({
          success: true,
          redirect: '/',
          external: true
        })
      });
    }
  });
});

router.post('/register', (req, res) => {
  validateUser(req.body)
    .then(data => {
      User.register(new User({email: data.email}), data.password, (err, user) => {
        if (err) {
          res.json({
            success: false,
            errors: [{field: 'email', message: err.message}]
          })
        }

        const fillableData = _.pick(data, User.fillableFields());

        User.findOneAndUpdate({email: data.email}, fillableData, {'new': true})
          .then(user => {
            req.login(user, err => {
              if (err) {
                res.json({
                  success: false,
                  errors: [{field: 'email', message: err.message}]
                });
              }

              res.store.dispatch(loginUser(user));
              res.send({
                success: true,
                external: true,
                redirect: '/'
              });
            })
          })
          .catch(error => {
            console.log('ERROR', error);
          })
      })
    })
    .catch(errors => {
      console.log('ERRORS', errors);
      res.json({
        success: false,
        errors
      });
    });
});

router.get('/logout', (req, res) => {
  res.store.dispatch(logoutUser());
  req.logout();
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

router.get('/seed', (req, res) => {
  User.register(new User({email: 'riley@opencircuit.us'}), 'estiondf', (err, user) => {
    if (err) {
      res.json({
        success: false,
        errors: [{field: 'email', message: err.message}]
      })
    }

    const data = {
      email: 'riley@opencircuit.us',
      first_name: 'Riley',
      last_name: 'Pagett',
      phone: '(803) 322 - 4757',
      street: '737 Atherton Way',
      city: 'Rock Hill',
      state: 'SC',
      zip: 29730,
      roles: [1]
    }

    User.findOneAndUpdate({email: data.email}, data, {'new': true})
      .then(user => {
        req.login(user, err => {
          if (err) {
            res.json({
              success: false,
              errors: [{field: 'email', message: err.message}]
            });
          }

          res.store.dispatch(loginUser(user));
          res.send({
            success: true,
            external: true,
            redirect: '/'
          });
        })
      })
})

export default router;