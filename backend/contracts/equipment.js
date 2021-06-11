const Joi = require("joi");

const create = Joi.object({
  name: Joi.string(),
  definition: Joi.string(),
  brand: Joi.string(),
  modelEquip: Joi.string(),
  serie: Joi.string(),
  weight: Joi.number(),
  provider: Joi.string(),
  invimaReg: Joi.string(),
  usefulLife: Joi.string(),
  noInvima: Joi.string(),
  length: Joi.number(),
  width: Joi.number(),
  depth: Joi.number(),
  photo: Joi.string(),
}).required();

const update = Joi.object({
  name: Joi.string(),
  definition: Joi.string(),
  brand: Joi.string(),
  modelEquip: Joi.string(),
  serie: Joi.string(),
  weight: Joi.number(),
  provider: Joi.string(),
  invimaReg: Joi.string(),
  usefulLife: Joi.string(),
  noInvima: Joi.string(),
  length: Joi.number(),
  width: Joi.number(),
  depth: Joi.number(),
  photo: Joi.string(),
  active: Joi.boolean(),
}).required();

module.exports = { create, update };
