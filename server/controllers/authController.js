import _ from 'lodash';
import model from '../models/userModel';
import hash from '../helpers/Bcrypt';
import generate from '../helpers/jwtVerifyToken';
import validation from '../validations/authValidation';

class Users {

  static async signup(req, res) {

    // create admin
    await model.createAdmin();

    // check if there's an error in our request sent
    const { error } = validation.signup(req.body);

    const arrErrorList = [];

    const errorValidator = () => {
    for (let i = 0; i < error.details.length; i++) {
      arrErrorList.push(error.details[i].message);
    }
  };

  if(error){
    `${errorValidator()}`;
    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: arrErrorList,
      });
    }
  }

    // check if the provided email is registered before
    const found = model.findOne(req.body.email);
    if (found) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This e-mail is already registered!',
      });
    }

    // create a new user and return user data includes token
    const newUser = await model.create(req.body);
    const token = generate.getToken(_.pick(newUser, [
      'id',
      'email',
      'firstname',
      'lastname',
      'address',
      'status',
      'isAdmin',
      'created_on',
    ]));
    return res
      .header('Authorization', `${token}`)
      .status(201)
      .send({
        status: res.statusCode,
        message: 'User account created!',
        data: {
          token,
          id: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          address: newUser.address,
          status: newUser.status,
          isAdmin: newUser.isAdmin,
          created_on: newUser.created_on,
        },
      });
  }

  static async login(req, res) {

    // create admin
    await model.createAdmin();

    // check if there's an error in our request sent
    const { error } = validation.login(req.body);

    const arrErrorList = [];

    const errorValidator = () =>{
    for (let i = 0; i < error.details.length; i++) {
      arrErrorList.push(error.details[i].message);
    }
  }

  if(error){
    `${errorValidator()}`;
    if (error) {
        return res.status(400).send({
        status: res.statusCode,
        error: arrErrorList,
      });
    }
  }

    // extract our email and password from the request body
    const { email, password } = req.body;

    // check if the provided email is registered
    const found = await model.findOne(email);
    if (!found) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'This e-mail is not yet registered!',
      });
    }


    /** check if the provided password is matching with or equal to
     * the hashed password in our memory
     */
    const match = await hash.isMatch(password, found.hashedPwd);
    if (!match || !found) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Wrong credential provided!',
      });
    }

    /** generate a token to be given to the logged in user */
    const token = generate.getToken(
      _.pick(found, [
        'id',
        'email',
        'firstname',
        'lastname',
        'address',
        'status',
        'isAdmin',
        'created_on',
      ]),
    );

    // set the new token in the response - back to the client
    found.token = token;

    // return the logged in user's data with a token
    return res
      .header('Authorization', `${token}`)
      .status(200)
      .send({
        status: res.statusCode,
        message: 'Login successful!',
        data: {
          token,
          id: found.id,
          email: found.email,
          firstname: found.firstname,
          lastname: found.lastname,
          address: found.address,
          status: found.status,
          isAdmin: found.isAdmin,
          created_on: found.created_on,
        },
      });
  }
}

export default Users;
