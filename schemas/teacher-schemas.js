import Joi from 'joi';

const addSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
});

export default {
  addSchema,
};
