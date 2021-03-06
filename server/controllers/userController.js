import _ from 'lodash';
import model from '../models/userModel';

const userVerifyError = (res, status, error) => res.status(status).send({ status, error });
class UserController {
  // Verify a user account - "Verified"
  static async verifyAccount (req, res) {
    const { email } = req.params;
    const userFound = await model.findByEmail(email);
    
    if (!userFound.rows[0]) {
      userVerifyError(res, 404, 'User email not found!');
    } else {
      const { rows } = await model.verifyEmail(email);
      return res.status(200).send({
        status: res.statusCode,
        message: 'User Account Verified!',
        data: _.pick(rows[0], [
          'email',
          'firstname',
          'lastname',
          'password',
          'address',
          'status'
        ])
      });
    }
  }
}

export default UserController;
