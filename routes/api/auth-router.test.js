import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import app from '../../app.js';

import User from '../../models/User.js';

import { AuthTestData } from '../../helpers/index.js';

const { DB_TEST_HOST, PORT, JWT_SECRET } = process.env;

describe('test /api/auth/signup route', () => {
  let skipAfterEach = false;
  let server = null;

  const authTestData = new AuthTestData({
    email: 'lizataran@mail.com',
    password: 'lizataran1234',
    type: 'teacher',
  });

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

    const signupData = authTestData;

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(201);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });

    expect(user.email).toBe(signupData.email);

    const isPasswordHashed = await bcrypt.compare(signupData.password, user.password);
    expect(isPasswordHashed).toBe(true);

    const { id } = jwt.verify(user.token, JWT_SECRET);
    expect(id).toBe(user._id.toString());
  });

  test('test with already existing email', async () => {
    const signupData = authTestData;

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(409);
    expect(body.message).toBe('User with this email already exists');
  });

  test('test with invalid email', async () => {
    const signupData = authTestData.invalid('email', 'lizataranmail.com');

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('email does not match the required pattern');
  });

  test('test with missing email field', async () => {
    const signupData = authTestData.missing('email');
    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('missing required email field');
  });

  test('test with missing number of characters for password', async () => {
    const signupData = authTestData.invalid('password', '1234');

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('password should have a minimum length of 8');
  });

  test('test with missing password field', async () => {
    const signupData = authTestData.missing('password');

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('missing required password field');
  });

  test('test with wrong type field value', async () => {
    const signupData = authTestData.invalid('type', 'user');

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('items in the type field should match list of valid values');
  });

  test('test with missing type field', async () => {
    const signupData = authTestData.missing('type');

    const { statusCode, body } = await request(app).post('/api/auth/signup').send(signupData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('missing required type field');
  });
});

describe('test /api/auth/signin route', () => {
  let server = null;
  let user = null;

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);

    const signupData = {
      email: 'lizataran@mail.com',
      password: 'lizataran1234',
      type: 'teacher',
    };

    const { body } = await request(app).post('/api/auth/signup').send(signupData);
    user = body;
  });

  afterAll(async () => {
    await User.deleteMany();

    await mongoose.connection.close();
    server.close();
  });

  const authTestData = new AuthTestData({ email: 'lizataran@mail.com', password: 'lizataran1234' });

  test('test with a correct dataset', async () => {
    const signinData = authTestData;

    const { statusCode, body } = await request(app).post('/api/auth/signin').send(signinData);
    expect(statusCode).toBe(200);

    const { id } = jwt.verify(body.token, JWT_SECRET);
    expect(id).toBe(user._id.toString());
  });

  test('test with invalid email', async () => {
    const signinData = authTestData.invalid('email', 'lizataranmail.com');

    const { statusCode, body } = await request(app).post('/api/auth/signin').send(signinData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('email does not match the required pattern');
  });

  test('test with missing email field', async () => {
    const signinData = authTestData.missing('email');

    const { statusCode, body } = await request(app).post('/api/auth/signin').send(signinData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('missing required email field');
  });

  test('test with missing number of characters for password', async () => {
    const signinData = authTestData.invalid('password', '1234');

    const { statusCode, body } = await request(app).post('/api/auth/signin').send(signinData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('password should have a minimum length of 8');
  });

  test('test with missing password field', async () => {
    const signinData = authTestData.missing('password');

    const { statusCode, body } = await request(app).post('/api/auth/signin').send(signinData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('missing required password field');
  });

  test('test with incorrect password', async () => {
    const signinData = authTestData.invalid('password', 'LizaTaran1234');

    const { statusCode, body } = await request(app).post('/api/auth/signin').send(signinData);

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Incorrect password');
  });
});
