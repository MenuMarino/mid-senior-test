const loanModel = require('../models/loanModel');
const logger = require('../utils/logger');

const applyForLoan = async (req, res, next) => {
  try {
    const { amount, purpose, duration } = req.body;
    const userId = req.user.id;

    const loan = await loanModel.createLoan(userId, amount, purpose, duration);
    logger.info(
      `Loan application submitted by user ${userId}. Duration: ${duration}`
    );

    res.status(201).json({ message: 'Loan application submitted', loan });
  } catch (error) {
    logger.error(`Error applying for loan: ${error.message}`);
    return next({ status: 500, message: error.message });
  }
};

const getUserLoans = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { cursor, limit } = req.query;

    const loans = await loanModel.getLoansByUser(userId, cursor, limit);
    const nextCursor = loans.length ? loans[loans.length - 1].created_at : null;

    res.status(200).json({ loans, nextCursor });
  } catch (error) {
    logger.error(`Error fetching loans: ${error.message}`);
    return next({ status: 500, message: error.message });
  }
};

const getLoanById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const loanId = req.params.id;

    const loan = await loanModel.getLoanById(loanId, userId);
    if (!loan) {
      return next({ status: 404, message: 'Loan not found' });
    }

    res.status(200).json({ loan });
  } catch (error) {
    logger.error(`Error fetching loan: ${error.message}`);
    return next({ status: 500, message: error.message });
  }
};

const updateLoanStatus = async (req, res, next) => {
  try {
    const loanId = req.params.id;
    const { status } = req.body;

    const updatedLoan = await loanModel.updateLoanStatus(loanId, status);
    if (!updatedLoan) {
      return next({ status: 404, message: 'Loan not found' });
    }

    logger.info(`Loan ${loanId} status updated to ${status}`);
    res
      .status(200)
      .json({ message: 'Loan status updated', loan: updatedLoan[0] });
  } catch (error) {
    logger.error(`Error updating loan status: ${error.message}`);
    return next({ status: 500, message: error.message });
  }
};

module.exports = {
  applyForLoan,
  getUserLoans,
  getLoanById,
  updateLoanStatus,
};
