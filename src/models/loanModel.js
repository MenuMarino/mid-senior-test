const db = require('../config/db');

const createLoan = async (userId, amount, purpose, duration) => {
  const newLoan = await db('loans')
    .insert({
      user_id: userId,
      amount,
      purpose,
      duration,
      status: 'Pending',
      total_paid: 0,
      remaining_balance: amount,
    })
    .returning('*');

  return newLoan[0];
};

const getLoansByUser = async (userId) => {
  return await db('loans').where({ user_id: userId });
};

const getLoanById = async (loanId, userId) => {
  return await db('loans').where({ id: loanId, user_id: userId }).first();
};

const updateLoanStatus = async (loanId, status) => {
  return await db('loans').where({ id: loanId }).update({ status }, ['*']);
};

module.exports = {
  createLoan,
  getLoansByUser,
  getLoanById,
  updateLoanStatus,
};
