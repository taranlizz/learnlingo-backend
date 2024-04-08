import express from 'express';

const teachersRouter = express.Router();

teachersRouter.get('/', async (req, res) => {
  res.json({ message: 'template message' });
});

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