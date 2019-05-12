import bcrypt from 'bcryptjs';

export default {

  /* returning the hashed password */
  async hashPassword(password, salt) {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  /*
  * check if the provided password in request body
  * is equal to the hashed password which is
  * in the memory
  */
  async isMatch(requestPassword, hashedPassword) {
    const matchedPassword = await bcrypt.compare(requestPassword, hashedPassword);
    return matchedPassword;
  },
};
