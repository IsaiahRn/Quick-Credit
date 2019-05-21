import _ from 'lodash';
import model from '../models/userModel';
import hash from '../helpers/Bcrypt';
import generate from '../helpers/jwtVerifyToken';
import validation from '../validations/authValidation';

class Users {
  static async signup (req, res) {

    // check if there's an error in our request sent
    const { error } = validation.signup(req.body);

    const arrErrorList = [];

    const errorValidator = () => {
      for (let i = 0; i < error.details.length; i++) {
        arrErrorList.push(error.details[i].message);
      }
    };

    if (error) {
      `${errorValidator()}`;
      if (error) {
        return res.status(400).send({
          status: res.statusCode,
          error: arrErrorList
        });
      }
    }

    // check if the provided email is registered before
    const found = await model.findOne(req.body.email);
    if (found.rows.length !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This e-mail is already registered!'
      });
    }

    // create a new user and return user data includes token
    const { rows } = await model.create(req.body);
    const token = generate.getToken(_.pick(rows[0], [
      'id',
      'email',
      'firstname',
      'lastname',
      'address',
      'status',
      'isAdmin',
      'created_on'
    ]));
    return res
      .header('Authorization', `${token}`)
      .status(201)
      .send({
        status: res.statusCode,
        message: 'User account created!',
        data: {
          token,
          id: rows[0].id,
          email: rows[0].email,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          address: rows[0].address,
          status: rows[0].status,
          isAdmin: rows[0].isAdmin,
          created_on: rows[0].created_on
        }
      });
  }

  static async login (req, res) {

    // check if there's an error in our request sent
    const { error } = validation.login(req.body);

    const arrErrorList = [];

    const errorValidator = () => {
      for (let i = 0; i < error.details.length; i++) {
        arrErrorList.push(error.details[i].message);
      }
    };

    if (error) {
      `${errorValidator()}`;
      if (error) {
        return res.status(400).send({
          status: res.statusCode,
          error: arrErrorList
        });
      }
    }

    // extract our email and password from the request body
    const { email, password } = req.body;

    // check if the provided email is registered
    const { rows } = await model.findOne(email);
    if (rows.length === 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'This e-mail is not yet registered!'
      });
    }

    /** check if the provided password is matching with or equal to
     * the hashed password in our memory
     */
    const match = await hash.isMatch(password, rows[0].password);
    if (!match) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Wrong credential provided!'
      });
    }

    /** generate a token to be given to the logged in user */
    const token = generate.getToken(
      _.pick(rows[0], [
        'id',
        'email',
        'firstname',
        'lastname',
        'address',
        'status',
        'isAdmin',
        'created_on'
      ])
    );


    // return the logged in user's data with a token
    return res
      .header('Authorization', `${token}`)
      .status(200)
      .send({
        status: res.statusCode,
        message: 'Login successful!',
        data: {
          token,
          id: rows[0].id,
          email: rows[0].email,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          address: rows[0].address,
          status: rows[0].status,
          isAdmin: rows[0].isAdmin,
          created_on: rows[0].created_on
        }
      });
  }

  // Get all loans
  static async getAllUsers (req, res) {
    const { rows } = await model.fetchAllUsers();
    
    return res.status(200).send({
      status: res.statusCode,
      message: "All User accounts!",
      data: rows
    });
  }

}

export default Users;
