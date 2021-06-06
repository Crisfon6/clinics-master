const Joi = require("joi");

const create = Joi.object({
  equipmentID: Joi.array().items(Joi.string()),
  clinicID: Joi.string(),
}).required();

const update = Joi.object({
  equipmentID: Joi.array().items(Joi.string()),
  clinicID: Joi.string(),
  active: Joi.boolean(),
}).required();

module.exports = { create, update };
