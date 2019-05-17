import _ from 'lodash';
import model from '../models/userModel';

const userVerifyError = (res, status, error) => res.status(status).send({status, error});
class UserController {

  // Verify a user account - "Verified"
  static verifyAccount(req, res) {
    const { email } = req.params;
    const userFound = model.findByEmail(email);
    if (!userFound) {
      userVerifyError(res, 404, 'User email not found!')
    }
    else{
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
}


export default UserController;
