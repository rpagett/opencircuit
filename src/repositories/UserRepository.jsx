import User from '../models/UserModel';

export default class UserRepository {
  static findByEmail(email, callback) {
    let user = User.findOne({ 'email': email }, (err, user) => {
      console.log(`In repo: Email = ${email}, User = ${user}`);
      callback(err, user);
    });
  }

  static findByToken(token) {
    User.findById(token, (err, user) => {
      if (err) {
        return null;
      }

      return user;
    });
  }
}