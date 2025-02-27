const db = require('../config/db');

const createPayment = async (loanId, amountPaid) => {
  return await db.transaction(async (trx) => {
    const payment = await trx('payments')
      .insert({
        loan_id: loanId,
        amount_paid: amountPaid,
        payment_date: trx.raw('CURRENT_DATE'),
      })
      .returning([
        'id',
        'loan_id',
        'amount_paid',
        trx.raw("TO_CHAR(payment_date, 'YYYY-MM-DD') AS payment_date"),
        'created_at',
      ]);

    await trx('loans')
      .where({ id: loanId })
      .decrement('remaining_balance', amountPaid)
      .increment('total_paid', amountPaid);

    return payment[0];
  });
};

const getPaymentsByLoanId = async (loanId, cursor, limit = 10) => {
  let query = db('payments')
    .where('loan_id', loanId)
    .orderBy('created_at', 'desc')
    .select(
      'id',
      'loan_id',
      'amount_paid',
      db.raw("TO_CHAR(payment_date, 'YYYY-MM-DD') AS payment_date"),
      'created_at'
    )
    .limit(limit);

  if (cursor) {
    query = query.where('created_at', '<', cursor);
  }

  return await query;
};

module.exports = {
  createPayment,
  getPaymentsByLoanId,
};
