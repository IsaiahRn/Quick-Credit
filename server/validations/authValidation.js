import Joi from 'joi';

export default {
  signup: (userData) => {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).trim().required(),
      firstname: Joi.string().min(3).trim().max(20)
        .required(),
      lastname: Joi.string().min(3).trim().max(20)
        .required(),
      password: Joi.string().min(8).max(16).regex(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/),
      // type: Joi.string().valid(['client', 'staff']),
      address: Joi.string().min(3).trim().max(20)
        .required(),
    };

    /**
     *   Referenced to StackOverflow
     * - Joi.js return a weird error message
     */
    const options = {
      language: {
        key: '{{key}} ',
        string: {
          regex: {
            base: 'must not contain at least One Digit, One Special Character, One Lowercase and One Uppercase Letter!',
          },
        },
      },
    };

    return Joi.validate(userData, schema, options);
  },

  /**
   * @Checking the provided email
   * for login credential if is valid
   */
  login: (value) => {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).trim().required(),
      password: Joi.string().required(),
    };

    const options = {
      language: {
        key: '{{key}} ',
      },
    };

    return Joi.validate(value, schema, options);
  },
};
