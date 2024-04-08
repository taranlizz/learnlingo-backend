import express from 'express';

import teachersController from '../../controllers/teachers-controller.js';

const teachersRouter = express.Router();

teachersRouter.get('/', teachersController.getAll);

teachersRouter.get('/:teacherId', async (req, res) => {
  res.json({ message: 'template message' });
});

teachersRouter.post('/', async (req, res) => {
  res.json({ message: 'template message' });
});

teachersRouter.delete('/:teacherId', async (req, res) => {
  res.json({ message: 'template message' });
});

teachersRouter.put('/:teacherId', async (req, res) => {
  res.json({ message: 'template message' });
});

export default teachersRouter;
