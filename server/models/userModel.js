import moment from 'moment';

import hash from '../helpers/Bcrypt';
import db from './index';


class User {

  /**
   * creating the new user
   */
  async create (request) {
    const {
      email, firstname, lastname, password, address
    } = request;
    const statusInput = String('Unverified');
    const hashedPwd = await hash.hashPassword(password, 10);
    const newUser = {
      email,
      firstname,
      lastname,
      hashedPwd,
      address,
      status: statusInput,
      isAdmin: false,
      created_on: moment().format('LLLL')
    };

    // Inserting into users table

    const queryText = 'INSERT INTO users(email,firstname,lastname,password,address,status,is_admin,created_on)VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*';
    const values = [
      newUser.email,
      newUser.firstname,
      newUser.lastname,
      newUser.hashedPwd,
      newUser.address,
      newUser.status,
      newUser.isAdmin,
      newUser.created_on,
    ];
    const result = await db.query(queryText, values);
    return result;
  }

  /* find a user by his/her registered email */
  async findOne (email) {
    const queryText = 'SELECT * FROM users WHERE email=$1;';
    const $email = email;
    const response = await db.query(queryText, [$email]);
    return response;
  }

  /* find a user by his/her id */
  async findById (id) {
    const queryText = 'SELECT * FROM users WHERE id=$1;';
    const response = await db.query(queryText, [parseInt(id, 10)]);
    return response;
  }

  async findByEmail (email) {
    const queryText = 'SELECT * FROM users WHERE email=$1;';
    const $email = email;
    const response = await db.query(queryText, [$email]);
    return response;
  }

  async findUser (token) {
    const queryText = 'SELECT * FROM users WHERE token=$1;';
    const $token = email;
    const response = await db.query(queryText, [$token]);
    return response;
  }
}

export default new User();
