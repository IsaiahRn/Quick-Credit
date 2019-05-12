import Joi from 'joi';

export default {
  createLoan(value) {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      tenor: Joi.number().required(),
      amount: Joi.number().required(),
    };

    return Joi.validate(value, schema);
  },

  ApproveReject(value) {
    const schema = Joi.object().keys({
      status: Joi.string().insensitive().valid('approved', 'rejected').required(),
    });
    return Joi.validate(value, schema);
  },
};