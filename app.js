import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import 'dotenv/config';

import authRouter from './routes/api/auth-router.js';
import teachersRouter from './routes/api/teachers-router.js';

const app = express();
const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(cors());
app.use(logger(formatLogger));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/teachers', teachersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
