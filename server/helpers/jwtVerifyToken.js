import jwt from 'jsonwebtoken';
import keys from '../config/keys';

export default {

  getToken (payload) {
    const token = jwt.sign(payload, keys.SECRET_KEY, {
      expiresIn: '24h'
    });
    return token;
  }
};
