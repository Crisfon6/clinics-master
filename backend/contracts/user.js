const Joi = require("joi");

const create = Joi.object({
  avatar: Joi.string(),
  name: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
}).required();

const update = Joi.object({
  avatar: Joi.string(),
  name: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.boolean().required(),
}).required();

module.exports = { create, update };
