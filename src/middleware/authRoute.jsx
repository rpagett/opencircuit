import User from '../models/User/UserModel';
import { UserRoles } from '../models/User/UserRoles';

export function userHasRole(user, role) {
  return user.roles.includes(UserRoles.Administrator) || user.roles.includes(role);
}

export function userOrAdmin() {
  return (req, res, next) => {
    const authToken = req.get('Authorization');

    if (!authToken) {
      res.status(403).send({
        success: false,
        error: 'Access denied.'
      })
    }

    User.findOne({ apiToken: authToken }, 'email roles apiToken')
      .then(user => {
        if (!user) {
          res.status(403).send({
            success: false,
            error: 'Access denied.'
          })
        }

        if (user.email !== req.body.email && !userHasRole(user, UserRoles.Administrator)) {
          res.status(403).send({
            success: false,
            error: 'Access denied.'
          })
        }

        next();
      });
  }
}

export function hasRole(role = null) {
  return (req, res, next) => {
    const authToken = req.get('Authorization');

    if (!authToken) {
      res.status(403).send({
        success: false,
        error: 'Access denied.'
      })
    }

    User.findOne({ apiToken: authToken }, 'roles apiToken')
      .then(user => {
        if (!user) {
          res.status(403).send({
            success: false,
            error: 'Access denied.'
          })
        }

        if (role && !userHasRole(user, role)) {
          res.status(403).send({
            success: false,
            error: 'Access denied.'
          })
        }

        next();
      })
      .catch(err => {
        res.status(403).send({
          success: false,
          error: err.message
        })
      })
  }
}