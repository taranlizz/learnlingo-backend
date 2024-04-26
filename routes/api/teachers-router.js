import express from 'express';

import teachersController from '../../controllers/teachers-controller.js';

import { isEmptyBody, isValidId } from '../../middlewars/index.js';
import { validateBody } from '../../decorators/index.js';

import teacherValidationSchema from '../../schemas/teacher-schemas.js';

const teachersRouter = express.Router();

teachersRouter.get('/', teachersController.getAll);

teachersRouter.get('/:teacherId', isValidId, teachersController.getById);

teachersRouter.post(
  '/',
  isEmptyBody,
  validateBody(teacherValidationSchema),
  teachersController.add
);

// teachersRouter.put(
//   '/:teacherId',
//   isEmptyBody,
//   validateBody(teacherSchemas.add),
//   teachersController.updateById
// );

// teachersRouter.delete('/:teacherId', teachersController.deleteById);

export default teachersRouter;
