import Express from 'express';
import _ from 'lodash';
import multer from 'multer';

import { Form, FormObligation } from './FormModel';
import Unit from '../Unit/UnitModel';

import validateForm from './FormValidation';
import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

function deriveFileExtension(fname) {
  return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
}

function multerMiddleware(folder) {
  return multer({
    dest: 'files/' + folder + '/'
  })
}

let router = Express.Router();

router.route('/')
  .get(hasRole(UserRoles.FormsManager), (req, res) => {
    let forms = [ ];
    Form.find({ }, 'name')
      .then(formRes => {
        forms = formRes;
        return Unit.aggregate([
          {$match: {registered: true}},
          {$unwind: '$form_obligations'}, /* this converts arrays into unique documents for counting */
          {
            $group: {
              _id: '$form',
              count: {$sum: 1}
            }
          }
        ])
      })
      .then(agg => {
        console.log(agg);

        res.json({
          success: true,
          contents: forms
        })
      })
  })

  .post(hasRole(UserRoles.FormsManager), multerMiddleware('form_templates').single('file'), (req, res) => {
    validateForm(req.body)
      .then(data => {
        let filename = data.name;
        if (!filename || filename == 'undefined' || typeof filename == 'undefined') {
          filename = req.file.originalname;
        }

        let form = new Form({
          name: filename,
          description: data.description,
          form_filename: req.file.filename,
          form_extension: deriveFileExtension(req.file.originalname),
          uploader: req.user._id
        })

        return Form.save()
      })
      .then(form => {
        res.json({
          success: true,
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