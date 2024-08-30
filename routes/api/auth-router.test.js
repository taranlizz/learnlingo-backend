import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app.js';

import User from '../../models/User.js';

const { DB_TEST_HOST, PORT, JWT_SECRET } = process.env;

describe('test /api/auth/signup route', () => {
  let skipAfterEach = false;
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    if (!skipAfterEach) {
      await User.deleteMany();
    }
    skipAfterEach = false;
  });

  test('test with correct data', async () => {
    skipAfterEach = true;

    const signupData = {
      email: 'lizataran@mail.com',
      password: 'lizaTaran1234',
      type: 'teacher',
    };

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(201);
    expect(body.username).toBe(signupData.username);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });

    expect(user.email).toBe(signupData.email);

    const isPasswordHashed = await bcrypt.compare(signupData.password, user.password);
    expect(isPasswordHashed).toBe(true);

    const { id } = jwt.verify(user.token, JWT_SECRET);
    expect(id).toBe(user._id.toString());
  });

  test('test with already existing email', async () => {
    const signupData = {
      email: 'lizataran@mail.com',
      password: 'lizaTaran1234',
      type: 'teacher',
    };
    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(409);
    expect(body.message).toBe('User with this email already exists');
  });
});
