import Express from 'express';
import _ from 'lodash';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';
import Unit from '../Unit/UnitModel';

let router = Express.Router();
// All routes are '/api/reports/...'

router.get('/quickbooks', (req, res) => {
  Unit.find({ registered: true }, 'name slug createdAt')
    .sort('createdAt')
    .exec()
    .then(units => {
      res.json({
        success: true,
        contents: units
      })
    })
});

router.get('/drawstatus', (req, res) => {
  Unit.find({ registered: true }, 'name confirmed_paid_date director')
    .populate('director', 'first_name mi last_name')
    .exec()
    .then(units => {
      for (let key in units) {
        const unit = units[key].toObject();

        if (unit.confirmed_paid_date) {
          units[key] = {
            ...unit,
            paymentStatus: 'Received',
            paymentClass: 'cell-green'
          }
        }
        else {
          units[key] = {
            ...unit,
            paymentStatus: 'Awaiting',
            paymentClass: 'cell-red'
          }
        }
      }

      units.sort((a, b) => {
        if (a.paymentStatus == b.paymentStatus) {
          return a.name.localeCompare(b.name);
        }

        return a.paymentStatus.localeCompare(b.paymentStatus);
      })

      res.json({
        success: true,
        contents: units
      })
    })
});

export default router;