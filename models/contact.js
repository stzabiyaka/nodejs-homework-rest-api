const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');
const { regexp } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      match: regexp.email,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);

const addSchema = joi.object({
  name: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  phone: joi.string().pattern(regexp.phone).required().messages({
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}`,
    'any.required': `missing required field: {{#label}}`,
  }),
  favorite: joi.bool(),
});

const updateSchema = joi
  .object({
    name: joi.string().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
    }),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).messages({
      'string.email': `{{#label}} must be a valid email`,
    }),
    phone: joi.string().pattern(regexp.phone).messages({
      'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}`,
    }),
    favorite: joi.bool().messages({
      'bool.base': `{{#label}} should be a type of 'boolean'`,
    }),
  })
  .min(1)
  .messages({
    'any.min': 'missing fields',
  });

const updateFavoriteSchema = joi.object({
  favorite: joi.bool().required().messages({
    'bool.base': `{{#label}} should be a type of 'boolean'`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const schemas = { addSchema, updateSchema, updateFavoriteSchema };
const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
