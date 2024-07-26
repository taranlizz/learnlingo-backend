import Joi from 'joi';

import ErrorMessage from './ErrorMessage.js';

import { checkNameField } from './customValidators.js';

import { levelsList } from '../models/Teacher.js';

const addAndUpdate = Joi.object({
  name: Joi.string()
    .required()
    .custom((value, helpers) => checkNameField(value, helpers))
    .messages(ErrorMessage('name')),
  languages: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages(ErrorMessage('languages')),
  levels: Joi.array()
    .items(
      Joi.string()
        .required()
        .valid(...levelsList)
    )
    .required()
    .messages(ErrorMessage('levels')),
  pricePerHour: Joi.number().required().min(0).messages(ErrorMessage('pricePerHour')),
  lessonsDone: Joi.number().min(0).required().messages(ErrorMessage('lessonsDone')),
  lessonInfo: Joi.string().required().messages(ErrorMessage('lessonInfo')),
  conditions: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages(ErrorMessage('conditions')),
  experience: Joi.string().required().messages(ErrorMessage('experience')),
});

export default {
  addAndUpdate,
};
