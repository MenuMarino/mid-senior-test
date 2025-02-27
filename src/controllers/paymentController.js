const paymentModel = require('../models/paymentModel');
const loanModel = require('../models/loanModel');
const logger = require('../utils/logger');

const makePayment = async (req, res) => {
  try {
    const { loanId, amountPaid } = req.body;
    const userId = req.user.id;

    const loan = await loanModel.getLoanById(loanId, userId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found.' });
    }

    if (loan.status !== 'Approved') {
      return res
        .status(400)
        .json({ message: 'Only approved loans can receive payments.' });
    }

    if (loan.remaining_balance < amountPaid) {
      return res
        .status(400)
        .json({ message: 'Payment exceeds remaining balance.' });
    }

    const payment = await paymentModel.createPayment(loanId, amountPaid);
    logger.info(
      `User ${userId} made a payment of ${amountPaid} for loan ${loanId} on ${payment.payment_date}.`
    );

    res.status(201).json({ message: 'Payment successful', payment });
  } catch (error) {
    logger.error(`Payment error: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getLoanPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const loanId = req.params.id;
    const { cursor, limit } = req.query;

    const loan = await loanModel.getLoanById(loanId, userId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found.' });
    }

    const payments = await paymentModel.getPaymentsByLoanId(
      loanId,
      cursor,
      limit
    );
    logger.info(
      `${payments.length} payment loans found for user ${userId} with loan id ${loanId}`
    );
    const nextCursor = payments.length
      ? payments[payments.length - 1].created_at
      : null;

    res.status(200).json({ payments, nextCursor });
  } catch (error) {
    logger.error(`Error retrieving payments: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  makePayment,
  getLoanPayments,
};
