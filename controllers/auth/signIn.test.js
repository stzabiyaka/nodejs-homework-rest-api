const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const { hasher } = require('../../helpers');

const app = require('../../app');
const { User } = require('../../models/user');

const { PORT = 3000, DB_TEST_HOST } = process.env;

jest.setTimeout(15000);

describe('Test signIn controller', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(done => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach(done => {
    mongoose.connection.db.dropCollection('users', () => {
      mongoose.connection.close(() => done());
    });
  });

  test('test user login', async () => {
    const password = '12345';
    const userCredentials = {
      email: 'user@mail.com',
      password,
    };

    const hashedPassword = await hasher(password, 10);

    const user = await User.create({
      ...userCredentials,
      password: hashedPassword,
      verify: true,
      verificationToken: 'verificationToken',
    });

    const response = await request(app).post('/api/users/login').send(userCredentials);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
    expect(body.user).toBeTruthy();
    expect(body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });

  test('test user email not verified', async () => {
    const password = '12345';
    const userCredentials = {
      email: 'user@mail.com',
      password,
    };

    const hashedPassword = await hasher(password, 10);

    await User.create({
      ...userCredentials,
      password: hashedPassword,
      verify: false,
      verificationToken: 'verificationToken',
    });

    const response = await request(app).post('/api/users/login').send(userCredentials);
    expect(response.statusCode).toBe(401);
    const { body } = response;
    expect(body.message).toBe('Email not verified');
  });

  test('test wrong user password', async () => {
    const password = '12345';
    const wrongPassword = '12346';
    const userCredentials = {
      email: 'user@mail.com',
      password: wrongPassword,
    };

    const hashedPassword = await hasher(password, 10);

    await User.create({
      ...userCredentials,
      password: hashedPassword,
      verify: true,
      verificationToken: 'verificationToken',
    });

    const response = await request(app).post('/api/users/login').send(userCredentials);
    expect(response.statusCode).toBe(401);
    const { body } = response;
    expect(body.message).toBe('Email or password is wrong');
  });

  test('test wrong user email', async () => {
    const password = '12345';
    const wrongEmail = 'userwrong@mail.com';
    const userCredentials = {
      email: 'user@mail.com',
      password,
    };

    const hashedPassword = await hasher(password, 10);

    await User.create({
      ...userCredentials,
      password: hashedPassword,
      verify: true,
      verificationToken: 'verificationToken',
    });

    const response = await request(app)
      .post('/api/users/login')
      .send({ ...userCredentials, email: wrongEmail });
    expect(response.statusCode).toBe(401);
    const { body } = response;
    expect(body.message).toBe('Email or password is wrong');
  });
});
