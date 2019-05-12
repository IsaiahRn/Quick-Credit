import _ from 'lodash';
import model from '../models/userModel';

class UserController {
  // Verify a user account - "Verified"
  static verifyAccount(req, res) {
    const { email } = req.params;
    const userFound = model.findByEmail(email);
    if (!userFound) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'User email not found!',
      });
    }

    // userFound.status = req.body.status;

    const updatedUser = model.verifyEmail(email);

    return res.status(200).send({
      status: res.statusCode,
      message: 'User Account Verified!',
      data: _.pick(updatedUser, [
        'email',
        'firstname',
        'lastname',
        'password',
        'address',
        'status',
      ]),
    });
  }
}

export default UserController;
