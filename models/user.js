const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');
const { regexp } = require('../helpers');

const SUBSCRIPTION_OPTS = ['starter', 'pro', 'business'];

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
      enum: SUBSCRIPTION_OPTS,
      default: 'starter',
    },
    avatarURL: { type: String },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

const signSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  password: joi.string().required().messages({
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const updateSubscriptionSchema = joi.object({
  subscription: joi
    .string()
    .valid(...SUBSCRIPTION_OPTS)
    .required()
    .messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
      'any.required': `missing required field: {{#label}}`,
    }),
});

const resendVerifyEmailSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const schemas = {
  signSchema,
  updateSubscriptionSchema,
  resendVerifyEmailSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
