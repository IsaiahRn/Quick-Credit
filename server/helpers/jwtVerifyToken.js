import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export default {

  // returning the token which has an expiration time of 1 hour
  getToken (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    return token;
  }
};
