const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../middlewares');

const contactRegexp = {
  phone: /^(\(\d{3}\))\s?(\d{3}-\d{4})$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      match: contactRegexp.email,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required(),
  phone: joi.string().pattern(contactRegexp.phone).required(),
  favorite: joi.bool(),
});

const updateSchema = joi
  .object({
    name: joi.string(),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }),
    phone: joi.string().pattern(contactRegexp.phone),
    favorite: joi.bool(),
  })
  .min(1);

const updateFavoriteSchema = joi.object({
  favorite: joi.bool().required(),
});

const schemas = { addSchema, updateSchema, updateFavoriteSchema };
const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
