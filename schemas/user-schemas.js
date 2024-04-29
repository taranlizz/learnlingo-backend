import Joi from 'joi';

import ErrorMessage from './ErrorMessage.js';

import { emailRegex, passwordRegex } from '../models/User.js';

const signUp = Joi.object({
  name: Joi.string().required().messages(ErrorMessage('name')),
  surname: Joi.string().required().messages(ErrorMessage('surname')),
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegex)
    .required()
    .messages(ErrorMessage('password', 8)),
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
