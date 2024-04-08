import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import teachersRouter from './routes/api/teachers-router.js';

const app = express();
const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(cors());
app.use(logger(formatLogger));

app.use('/api/teachers', teachersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
