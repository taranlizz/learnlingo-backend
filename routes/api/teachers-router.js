import express from 'express';

import teachersController from '../../controllers/teachers-controller.js';

import { isEmptyBody, isValidId } from '../../middlewars/index.js';
import { validateBody } from '../../decorators/index.js';

import teacherSchemas from '../../schemas/teacher-schemas.js';

const teachersRouter = express.Router();

teachersRouter.get('/', teachersController.getAll);

teachersRouter.get('/:teacherId', isValidId, teachersController.getById);

teachersRouter.post(
  '/',
  isEmptyBody,
  validateBody(teacherSchemas.addAndUpdate),
  teachersController.add
);

teachersRouter.put(
  '/:teacherId',
  isValidId,
  isEmptyBody,
  validateBody(teacherSchemas.addAndUpdate),
  teachersController.updateById
);

teachersRouter.delete('/:teacherId', isValidId, teachersController.deleteById);

export default teachersRouter;
