const Joi = require("joi");

const create = Joi.object({
  executeBy: Joi.string(),
  equipment: Joi.string(),
  status: Joi.string(),
  date: Joi.date(),
}).required();

const update = Joi.object({
  executeBy: Joi.string(),
  equipment: Joi.string(),
  status: Joi.string(),
  date: Joi.date(),
  active: Joi.boolean(),
}).required();

module.exports = { create, update };
