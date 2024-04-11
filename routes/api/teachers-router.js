import express from 'express';

import teachersController from '../../controllers/teachers-controller.js';

import { isEmptyBody } from '../../middlewars/index.js';

const teachersRouter = express.Router();

teachersRouter.get('/', teachersController.getAll);

teachersRouter.get('/:teacherId', teachersController.getById);

teachersRouter.post('/', isEmptyBody, teachersController.add);

teachersRouter.put('/:teacherId', isEmptyBody, teachersController.updateById);

teachersRouter.delete('/:teacherId', teachersController.deleteById);

export default teachersRouter;
