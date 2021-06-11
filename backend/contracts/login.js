const Joi = require("joi");

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

module.exports = { login };
