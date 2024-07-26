import Joi from 'joi';

import ErrorMessage from './ErrorMessage.js';

import { checkNameField } from './customValidators.js';

import { emailRegex, typesList } from '../models/User.js';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const signUp = Joi.object({
  name: Joi.string()
    .required()
    .custom((value, helpers) => checkNameField(value, helpers))
    .messages(ErrorMessage('name')),
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegex)
    .required()
    .messages(ErrorMessage('password', 8)),
  type: Joi.string()
    .required()
    .valid(...typesList)
    .messages(ErrorMessage('type')),
});

const signIn = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegex)
    .required()
    .messages(ErrorMessage('password', 8)),
});

export default {
  signUp,
  signIn,
};
