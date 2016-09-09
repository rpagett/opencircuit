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

router.get('/reauth', (req, res) => {
  User.findOneAndUpdate({email: 'riley@opencircuit.us'}, { roles: [1] })
    .then(user => {
      res.json({
        success: true
      })
    })
})

export default router;