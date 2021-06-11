const Joi = require("joi");

const create = Joi.object({
  userId: Joi.string(),
  CV: Joi.string(),
}).required();

const update = Joi.object({
  userId: Joi.string(),
  CV: Joi.string(),
  active: Joi.boolean(),
}).required();

module.exports = { create, update };
