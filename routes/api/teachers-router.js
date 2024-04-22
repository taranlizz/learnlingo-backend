import express from 'express';

import teachersController from '../../controllers/teachers-controller.js';

import { isEmptyBody } from '../../middlewars/index.js';
import { validateBody } from '../../decorators/index.js';

import teacherSchemas from '../../schemas/teacher-schemas.js';

const teachersRouter = express.Router();

teachersRouter.get('/', teachersController.getAll);

// teachersRouter.get('/:teacherId', teachersController.getById);

teachersRouter.post('/', isEmptyBody, teachersController.add);

// teachersRouter.put(
//   '/:teacherId',
//   isEmptyBody,
//   validateBody(teacherSchemas.add),
//   teachersController.updateById
// );

// teachersRouter.delete('/:teacherId', teachersController.deleteById);

export default teachersRouter;
