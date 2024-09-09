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

const email = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages(ErrorMessage('email')),
});

const changePassword = Joi.object({
  newPassword: Joi.string().min(8).required().messages(ErrorMessage('newPassword', 8)),
  confirmPassword: Joi.string().min(8).required().messages(ErrorMessage('confirmPassword', 8)),
});

export default {
  signUp,
  signIn,
  email,
  changePassword,
};
