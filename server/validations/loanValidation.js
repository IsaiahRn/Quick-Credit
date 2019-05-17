import Joi from 'joi';

export default {
  createLoan(value) {
    const schema = {
      tenor: Joi.number().required(),
      amount: Joi.number().required(),
    };

    const options = {
      abortEarly: false
    };

    return Joi.validate(value, schema, options);
  },

  ApproveReject(value) {
    const schema = Joi.object().keys({
      status: Joi.string().insensitive().valid('approved', 'rejected').required(),
    });
    return Joi.validate(value, schema);
  },
};
