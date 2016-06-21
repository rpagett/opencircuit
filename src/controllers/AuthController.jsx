import Express from 'express';
import Indicative from 'indicative';

import User from '../models/UserModel';
import { loginUser } from '../actions/AuthActions';
import { translateValidationErrors } from '../helpers/functions'

let router = Express.Router();

router.post('/login', (req, res) => {
  User.authenticate()(req.body.email, req.body.password, (err, user, options) => {
    if (err) return next(err);
    if (user === false) {
      res.send({
        message: options.message,
        success: false
      });
    }
    else {
      req.login(user, function (err) {
        res.send({
          success: true,
          user: user
        });

        console.log('\n----\n')
        console.log(req.session);
      });
    }
  });
});

router.post('/register', (req, res) => {
  const rules = {
    'email': 'required|email',
    'password': 'required',
    'password-verify': 'required|same:password',
    'first-name': ['required', 'regex:^[a-zA-Z\.\s]+$'],
    'mi': 'max:1',
    'last-name': ['required', 'regex:^[a-zA-Z\-\s]+$'],
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  const messages = {
    'first-name.regex': 'Your first name may only contain letters and spaces.',
    'last-name.regex': 'Your last name may only contain letters, spaces, and dashes.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  const data = req.body;

  Indicative
    .validate(data, rules, messages)
    .then(() => {
      return User.register(new User({email: req.body.email}), req.body.password, (err, user) => {
        if (err) {
          res.send({
            success: false,
            message: err
          });
        }
        else {
          console.log('user registered!');
          req.login(user, function (err) {
            res.send({
              success: true,
              user: user
            });
          });
        }
      });
    })
    .catch((errors) => {
      const validationErrors = translateValidationErrors(errors);

      res.send({
        success: false,
        cause: 'validation',
        messages: validationErrors
      });
    });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

export default router;