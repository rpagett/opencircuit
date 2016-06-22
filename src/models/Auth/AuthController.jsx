import Express from 'express';
import Indicative from 'indicative';

import User from '../User/UserModel';
import { loginUser } from './AuthActions';
import { translateValidationErrors } from '../../helpers/functions'

let router = Express.Router();
// All routes are '/auth/...'

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
    'password_verify': 'required|same:password',
    'first_name': ['required', 'regex:^[a-zA-Z\.\s]+$'],
    'mi': 'max:1',
    'last_name': ['required', 'regex:^[a-zA-Z\-\s]+$'],
    'phone': 'required',
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  const messages = {
    'first_name.regex': 'Your first name may only contain letters and spaces.',
    'last_name.regex': 'Your last name may only contain letters, spaces, and dashes.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  const data = req.body;

  Indicative
    .validate(data, rules, messages)
    .then(() => {
      User.register(new User({email: req.body.email}), req.body.password, (err, user) => {
        if (err) {
          res.send({
            success: false,
            message: err
          });
        }
        else {
          console.log('user registered!');

          const {first_name, mi, last_name, phone, street, address_2, city, state, zip} = req.body;
          user.first_name = first_name;
          user.mi = mi;
          user.last_name = last_name;
          user.phone = phone;
          user.street = street;
          user.address_2 = address_2;
          user.city = city;
          user.state = state;
          user.zip = zip;

          user.save().then((user) => {
            req.login(user, function (err) {
              res.send({
                success: true,
                user: user
              });
            });
          })
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
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

export default router;