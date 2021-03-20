const request = require('supertest');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');
const app = require('../../src/app');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Marcos',
      email: 'marcos2@gmail.com',
      password: '123123',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: 'Marcos',
      email: 'marcos2@gmail.com',
      password: '123123',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await User.create({
      name: 'Marcos',
      email: 'marcos2@gmail.com',
      password: '123123',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    expect(response.body).toHaveProperty('token');
  });
});
