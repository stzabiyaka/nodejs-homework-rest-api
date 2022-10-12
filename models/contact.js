const { Schema, model } = require('mongoose');
const joi = require('joi');

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
      // match: contactRegexp.phone,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required(),
  phone: joi.string().pattern(contactRegexp.phone).required(),
  favorite: joi.bool(),
});

const schemas = { addSchema };
const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
