const joi = require('joi');

const addSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phone: joi
    .string()
    .pattern(/^(\([0-9]{3}\))\s?([0-9]*-[0-9]*)$/)
    .required(),
});

module.exports = { addSchema };
