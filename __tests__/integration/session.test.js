const request = require('supertest');
const { User } = require('../../src/app/models');
const app = require('../../src/app');

describe('Authentication', () => {
  // 'should receive JWT token when authenticaded with valid credentials'
  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Marcos',
      email: 'marcos2@gmail.com',
      password_hash: '123123',
    });

    const response = await request(app).post('/seesions').send({
      email: user.email,
      password_hash: '123123',
    });

    expect(response.status).toBe(200);
  });
});
