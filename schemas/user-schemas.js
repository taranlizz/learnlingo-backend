import Joi from 'joi';

import ErrorMessage from './ErrorMessage.js';

import { emailRegex, typesList } from '../models/User.js';

const signUp = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
  password: Joi.string().min(8).required().messages(ErrorMessage('password', 8)),
  type: Joi.string()
    .required()
    .valid(...typesList)
    .messages(ErrorMessage('type')),
});

const signIn = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
  password: Joi.string().min(8).required().messages(ErrorMessage('password', 8)),
});

const verifyEmail = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
});

export default {
  signUp,
  signIn,
  verifyEmail,
};
