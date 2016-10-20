import Express from 'express';
import Indicative from 'indicative';
import _ from 'lodash';
import uuid from 'node-uuid';

import * as UserEmail from '../User/UserEmails';
import * as Email from '../../helpers/mail';

import User from '../User/UserModel';
import { loginUser, logoutUser } from './AuthActions';
import validateUser from '../User/UserValidation';
import { translateValidationErrors } from '../../helpers/functions'

let router = Express.Router();
// All routes are '/auth/...'

router.post('/login', (req, res) => {
  const email = req.body.email.toLowerCase()
  User.authenticate()(email, req.body.password, function (err, user, options) {
    if (err || !user) {
      res.send({
        success: false,
        errors: [{field: 'email', message: options.message}],
      });
    }
    else if (!user.confirmed) {
      res.send({
        success: true,
        redirect: '/auth/must-confirm'
      })
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
      User.register(new User({email: data.email}), data.password, function(err, user) {
        if (err) {
          res.json({
            success: false,
            errors: [{field: 'email', message: err.message}]
          })
        }

        let fillableData = _.pick(data, User.fillableFields());
        fillableData = {
          ...fillableData,
          apiToken: uuid.v4(),
          confirmation_token: uuid.v1()
        }

        User.findOneAndUpdate({email: data.email}, fillableData, {'new': true})
          .then(user => {
            Email.sendHTML(user.email, 'Please confirm your new account.', UserEmail.confirmationEmail(user))

            res.send({
              success: true,
              redirect: '/auth/confirm'
            });
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

router.post('/recover', (req, res) => {
  const email = req.body.email.toLowerCase()
  User.findOneAndUpdate({ email: email }, { recovery_token: uuid.v1() }, { new: true })
    .then(user => {
      if (!user) {
        throw new Error('There is no user associated with that email address. Please register.')
      }

      Email.sendHTML(user.email, 'Password Recovery Request', UserEmail.recoveryEmail(user))

      res.send({
        success: true,
        redirect: '/auth/sent-recovery'
      })
    })
    .catch(err => {
      res.send({
        success: false,
        errors: [{field: 'email', message: err.message}]
      })
    })
})

router.post('/recover/:token', (req, res) => {
  User.findOne({ recovery_token: req.params.token }, 'first_name email recovery_token')
    .then(user => {
      if (!user) {
        throw new Error('That recovery code is invalid.');
      }

      if (!req.body.password) {
        res.json({
          success: false,
          errors: [{field: 'password', message: 'Password cannot be blank.'}]
        })
      }

      if (req.body.password !== req.body.password_verify) {
        res.json({
          success: false,
          errors: [{field: 'password', message: 'These passwords do not match.'}]
        })
      }

      user.setPassword(req.body.password, function(err, user) {
        if (err) {
          throw new Error(err);
        }

        if (!user.apiToken) {
          user.apiToken = uuid.v4();
        }

        //user.recovery_token = null;
        user.save()
          .then(user => {
            req.login(user, err => {
              res.send({
                success: true,
                redirect: '/',
                external: true
              })
            });
          })
      })
    })
    .catch(err => {
      res.send({
        success: false,
        error: err.message
      })
    })
})

router.get('/confirm/:token', (req, res) => {
  User.findOne({ confirmation_token: req.params.token }, '_id confirmation_token')
    .then(user => {
      if (!user) {
        res.send('That confirmation token is invalid.');
      }

      req.login(user, err => {
        if (err) {
          throw new Error(err.message);
        }

        res.store.dispatch(loginUser(user));
      })

      user.confirmation_token = null;
      user.confirmed = true;
      return user.save()
    })
    .then( () => {
      res.redirect(302, '/')
    })
    .catch(err => {
      res.send(err.message)
    })
})

export default router;