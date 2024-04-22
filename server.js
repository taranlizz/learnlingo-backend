import mongoose from 'mongoose';
import app from './app.js';

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Successfully connected to the database');
    app.listen(3000, () => console.log('Server running on 3000 PORT'));
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
