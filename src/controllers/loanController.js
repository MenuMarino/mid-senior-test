const loanModel = require('../models/loanModel');
const logger = require('../utils/logger');

const applyForLoan = async (req, res) => {
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
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserLoans = async (req, res) => {
  try {
    const userId = req.user.id;
    const loans = await loanModel.getLoansByUser(userId);

    logger.info(`${loans.length} loans found for user ${userId}`);

    res.status(200).json({ loans });
  } catch (error) {
    logger.error(`Error fetching loans: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getLoanById = async (req, res) => {
  try {
    const userId = req.user.id;
    const loanId = req.params.id;

    const loan = await loanModel.getLoanById(loanId, userId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json({ loan });
  } catch (error) {
    logger.error(`Error fetching loan: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLoanStatus = async (req, res) => {
  try {
    const loanId = req.params.id;
    const { status } = req.body;

    const updatedLoan = await loanModel.updateLoanStatus(loanId, status);
    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    logger.info(`Loan ${loanId} status updated to ${status}`);
    res.status(200).json({ message: 'Loan status updated', loan: updatedLoan });
  } catch (error) {
    logger.error(`Error updating loan status: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  applyForLoan,
  getUserLoans,
  getLoanById,
  updateLoanStatus,
};
