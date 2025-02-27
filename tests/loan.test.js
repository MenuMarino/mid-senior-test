const request = require('supertest');
const app = require('../src/app');

describe('Loan Management', () => {
  let userToken;
  let userCredentials = {
    name: 'Loan user',
    email: 'loan.user@test.com',
    password: 'password123',
  };

  beforeAll(async () => {
    // Register user
    const res = await request(app)
      .post('/api/users/register')
      .send(userCredentials);
    userToken = res.body.token;
  });

  test('User should be able to apply for a loan', async () => {
    // Create loan
    const res = await request(app)
      .post('/api/loans')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        amount: 5000,
        purpose: 'Medical Bills',
        duration: 12,
      });
    expect(res.status).toBe(201);
    expect(res.body.loan).toHaveProperty('status', 'Pending');
  });

  test('User should be able to retrieve their loans', async () => {
    // Get all loans
    const res = await request(app)
      .get('/api/loans')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.loans)).toBe(true);
  });
});
