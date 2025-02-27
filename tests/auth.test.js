const request = require('supertest');
const app = require('../src/app');

describe('User Authentication', () => {
  let testUser = {
    name: 'Auth user',
    email: 'auth.user@test.com',
    password: 'password123',
  };

  test('User registration should succeed', async () => {
    const res = await request(app).post('/api/users/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('User login should succeed with correct credentials', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('User login should fail with incorrect password', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid email or password.');
  });
});
