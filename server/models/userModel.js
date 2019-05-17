import moment from 'moment';

import hash from '../helpers/Bcrypt';
import generate from '../helpers/jwtVerifyToken';

const users = [];

class User {
  // @create an admin
  async createAdmin() {
    const hashedPwd = await hash.hashPassword('admin1234', 10);
    const adminInfo = {
      id: users.length + 1,
      email: 'admin@test.com',
      firstname: 'runoro',
      lastname: 'isaiah',
      hashedPwd,
      address: 'Quick-Credit HeadQuaters',
      isAdmin: true,
      created_on: moment(new Date()),
    };

    // pushing our admin to our array
    return users.push(adminInfo);
  }


  /**
   * creating the new user
   */
  async create(request) {
    const {
      email, firstname, lastname, password, address,
    } = request;
    const statusInput = String('Unverified');
    const hashedPwd = await hash.hashPassword(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      firstname,
      lastname,
      hashedPwd,
      address,
      status: statusInput,
      isAdmin: false,
      created_on: moment(new Date()),
    };

    // pushing our new users to our array
    users.push(newUser);

    const returnedUser = newUser;

    // generating a token
    const token = generate.getToken(newUser);

    // adding the token key with its value into the returned user Object
    returnedUser.token = token;

    // return that User info
    return returnedUser;
  }

  /* find a user by his/her registered email */
  findOne(email) {
    return users.find(user => user.email === email);
  }

  /* find a user by his/her id */
  findById(id) {
    return users.find(user => user.id === parseInt(id, 10));
  }

  findByEmail(email) {
    return users.find(user => user.email === email);
  }

  findUser(token){
    return users.filter(user => user.token === token);
  }


  verifyEmail(email) {
    const found = this.findByEmail(email);

    const index = users.indexOf(found);
    if (index === -1) {
      return undefined;
    }

    users[index].status = 'Verified';
    users[index].modified_at = moment(new Date());

    return users[index];
  }
}

export default new User();
