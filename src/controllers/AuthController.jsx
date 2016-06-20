import Express from 'express';

import User from '../models/UserModel';
import { loginUser } from '../actions/AuthActions';

let router = Express.Router();

router.post('/login', (req, res) => {
  User.authenticate()(req.body.email, req.body.password, (err, user, options) => {
    if (err) return next(err);
    if (user === false) {
      res.send({
        message: options.message,
        success: false
      });
    } else {
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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

export default router;