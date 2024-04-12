import Joi from 'joi';

const add = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
});

const update = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
});

export default {
  add,
  update,
};
