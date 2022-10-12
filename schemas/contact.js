const joi = require('joi');

const addSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required(),
  phone: joi
    .string()
    .pattern(/^(\(\d{3}\))\s?(\d{3}-\d{4})$/)
    .required(),
  favorite: joi.bool(),
});

module.exports = { addSchema };
