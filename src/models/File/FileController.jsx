import Express from 'express';
import _ from 'lodash';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import File from './FileModel';

import { UserRoles } from '../User/UserRoles';
import { hasRole, userOrAdmin } from '../../middleware/authRoute';

let router = Express.Router();
// All routes are /api/files/

function deriveFileExtension(fname) {
  return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
}

const multerMiddleware = multer({
  dest: 'files/uploads/'
})

router.route('/')
.get((req, res) => {
  File.find({ })
    .populate('uploader', 'first_name mi last_name')
    .exec()
    .then(files => {
      res.json({
        success: true,
        contents: files
      })
    })
})

.post(hasRole(UserRoles.Administrator), multerMiddleware.single('file'), (req, res) => {
  //console.log('file', req.file);
  //console.log('data', req.body);

  let filename = req.body.filename;
  if (!filename || filename == 'undefined' || typeof filename == 'undefined') {
    filename = req.file.originalname;
  }

  let file = new File({
    user_filename: req.body.filename || req.file.originalname,
    system_filename: req.file.filename,
    uploader: req.user._id,
    extension: deriveFileExtension(req.file.originalname)
  })

  file.save()
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(err => {
      console.log('SAVE ERR', err.message);
    })
})

router.route('/:filename')
.get((req, res) => {
  File.findOne({ system_filename: req.params.filename })
    .exec()
    .then(file => {
      if (!file) {
        res.sendStatus(404);
      }

      res.set('Content-disposition', 'attachment; filename=' + file.user_filename + '.' + file.extension);
      res.sendFile(path.resolve(process.cwd(), 'files', 'uploads', file.system_filename))
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(404);
    })
})

  .delete(hasRole(UserRoles.Administrator), (req, res) => {
    File.findOneAndRemove({ system_filename: req.params.filename })
      .exec()
      .then(file => {
        if (!file) {
          throw new Error('File not found.');
        }

        return fs.unlink('files/uploads/' + req.params.filename)
      })
      .then(() => {
        res.json({
          success: true
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