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

const getLoansByUser = async (userId, cursor, limit = 10) => {
  let query = db('loans')
    .where('user_id', userId)
    .orderBy('created_at', 'desc')
    .limit(limit);

  if (cursor) {
    query = query.where('created_at', '<', cursor);
  }

  return await query;
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
