import express from 'express';

import teachersController from '../../controllers/teachers-controller.js';

import { authenticate, isEmptyBody, isValidId, upload } from '../../middlewars/index.js';
import { validateBody } from '../../decorators/index.js';

import teacherSchemas from '../../schemas/teacher-schemas.js';

const teachersRouter = express.Router();

teachersRouter.get('/', teachersController.getAll);

teachersRouter.get('/:teacherId', authenticate, isValidId, teachersController.getById);

teachersRouter.post(
  '/',
  upload.single('avatar'),
  authenticate,
  isEmptyBody,
  validateBody(teacherSchemas.addAndUpdate),
  teachersController.add
);

teachersRouter.put(
  '/:teacherId',
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(teacherSchemas.addAndUpdate),
  teachersController.updateById
);

teachersRouter.delete('/:teacherId', authenticate, isValidId, teachersController.deleteById);

export default teachersRouter;
