import Joi from 'joi';

const addSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
});

export default {
  addSchema,
  updateSchema,
};
