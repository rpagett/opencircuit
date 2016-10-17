import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

import Judge from './JudgeModel';
import validateJudge from './JudgeValidation';

let router = Express.Router();
// All routes are /api/judges/

router.route('/')
  .get(hasRole(UserRoles.JudgeManager), (req, res) => {
    Judge.find({ }, '_id first_name middle_initial last_name email phone city state')
      .sort('last_name')
      .exec()
      .then(judges => {
        res.json({
          success: true,
          contents: judges
        })
      })
  })

  .post(hasRole(UserRoles.JudgeManager), (req, res) => {
    console.log('Body is', req.body);
    validateJudge(req.body)
      .then(data => {
        let judge = new Judge(data);

        return judge.save();
      })
      .then(judge => {
        res.json({
          success: true,
          redirect: judge.profileUrl
        })
      })
      .catch(errors => {
        console.log('We\'re in catch.', errors);
        res.json({
          success: false,
          errors
        })
      })
  })

router.route('/:email')
  .get(hasRole(UserRoles.JudgeManager), (req, res) => {
    Judge.findOne({ email: req.params.email })
      .then(judge => {
        if (!judge) {
          throw new Error('Judge not found.')
        }
        res.json({
          success: true,
          model: judge
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })

  .patch(hasRole(UserRoles.JudgeManager), (req, res) => {
    validateJudge(req.body)
      .then(data => {
        return Judge.findOneAndUpdate({email: req.params.email}, data, {
          fields: 'email profileUrl'
        })
      })
      .catch(errors => {
        res.json({
          success: false,
          errors
        })
      })
      .then(judge => {
        res.send({
          success: true,
          redirect: judge.profileUrl
        })
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message
        })
      })
  })

export default router;