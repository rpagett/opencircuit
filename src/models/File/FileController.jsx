import Express from 'express';
import _ from 'lodash';
import multer from 'multer';

import File from './FileModel';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are /api/files/

const multerMiddleware = multer({
  dest: './files/uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  }
})

router.route('/')
.get((req, res) => {
  File.find({ })
    .exec()
    .then(files => {
      res.json({
        success: true,
        contents: files
      })
    })
})

router.post('/', multerMiddleware.any(), (req, res) => {
  console.log('file', req.files);
  console.log('data', req.body);
  res.json({
    success: true
  })
})

export default router;