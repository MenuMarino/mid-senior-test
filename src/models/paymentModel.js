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

const getPaymentsByLoanId = async (loanId) => {
  return await db('payments')
    .where({ loan_id: loanId })
    .orderBy('payment_date', 'desc')
    .select(
      'id',
      'loan_id',
      'amount_paid',
      db.raw("TO_CHAR(payment_date, 'YYYY-MM-DD') AS payment_date"),
      'created_at'
    );
};

module.exports = {
  createPayment,
  getPaymentsByLoanId,
};
