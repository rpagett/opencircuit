import Express from 'express';
import _ from 'lodash';

import * as Email from '../../helpers/mail';

let router = Express.Router();
// All routes are '/api/support/...'

router.post('/', (req, res) => {
  try {
    if (!req.body.subject) {
      res.json({
        success: false,
        errors: [{field: 'subject', message: 'Subject cannot be blank.'}]
      })
    }
    else if (!req.body.details) {
      res.json({
        success: false,
        errors: [{field: 'details', message: 'Details cannot be blank.'}]
      })
    }

    Email.sendHTML('riley@opencircuit.us', "[Support]: " + req.body.subject, req.body.details)
    res.json({
      success: true,
      redirect: '/support/success'
    })
  }
  catch (err) {
    res.send({
      success: false,
      error: err.message
    })
  }
});

export default router;