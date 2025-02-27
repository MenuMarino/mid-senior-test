const request = require('supertest');
const app = require('../src/app');

describe('Loan Payments', () => {
  let userToken;
  let adminToken;
  let loanId;

  const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123',
  };

  const userCredentials = {
    name: 'Payment user',
    email: 'payment.user@test.com',
    password: 'password123',
  };

  test('User should be able to create a loan', async () => {
    // Register user
    const userRes = await request(app)
      .post('/api/users/register')
      .send(userCredentials);
    userToken = userRes.body.token;

    // Create loan
    const loanRes = await request(app)
      .post('/api/loans')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        amount: 5000,
        purpose: 'Car Repair',
        duration: 12,
      });
    loanId = loanRes.body.loan.id;
  });

  test('Admin should be able to approve the loan', async () => {
    // Admin login
    const res = await request(app)
      .post('/api/users/login')
      .send(adminCredentials);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    adminToken = res.body.token;

    // Approve loan
    const approveRes = await request(app)
      .patch(`/api/loans/${loanId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'Approved',
      });
  });

  test('User should be able to make a payment', async () => {
    // Pay loan
    const res = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        loanId: loanId,
        amountPaid: 500,
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Payment successful');
  });

  test('User should be able to retrieve payment history', async () => {
    // Get payments
    const res = await request(app)
      .get(`/api/loans/${loanId}/payments`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.payments)).toBe(true);
  });
});
