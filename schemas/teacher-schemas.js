import Joi from 'joi';

import ErrorMessage from './ErrorMessage.js';

const teacherValidationSchema = Joi.object({
  name: Joi.string().min(2).required().messages(ErrorMessage('name')),
  surname: Joi.string().required().messages(ErrorMessage('surname')),
  languages: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages(ErrorMessage('languages')),
  levels: Joi.array()
    .items(
      Joi.string()
        .required()
        .valid(
          'A1 Beginner',
          'A2 Elementary',
          'B1 Intermediate',
          'B2 Upper-Intermediate',
          'C1 Advanced'
        )
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

export default teacherValidationSchema;
