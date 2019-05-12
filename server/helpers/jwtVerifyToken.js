import jwt from 'jsonwebtoken';
import keys from '../config/keys';

export default {

  // returning the token which has an expiration time of 1 hour
  getToken(payload) {
    const token = jwt.sign(payload, keys.SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  },
};
