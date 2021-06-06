const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  userId: Joi.string().required(),
}).required();

const update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  userId: Joi.string().required(),
  active: Joi.boolean().required(),
}).required();

module.exports = { create, update };
