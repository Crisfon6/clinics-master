const Joi = require("joi");

const create = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
}).required();

const update = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  active: Joi.boolean(),
}).required();

module.exports = { create, update };
