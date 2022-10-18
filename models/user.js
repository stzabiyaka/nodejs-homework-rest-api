const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../middlewares');
const { regexp } = require('../helpers');

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: regexp.email,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

const signUpSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required(),
  password: joi.string().required(),
  subscription: joi.string(),
  token: joi.string(),
});

const signInSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required(),
  password: joi.string().required(),
});

const schemas = {
  signInSchema,
  signUpSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
