import Express from 'express';
import Indicative from 'indicative';

import User from '../User/UserModel';
import { loginUser, logoutUser } from './AuthActions';
import validateUser from '../User/UserValidation';
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
    validateUser(req.body)
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
  res.store.dispatch(logoutUser());
  req.logout();
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

export default router;