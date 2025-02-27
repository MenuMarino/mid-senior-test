const express = require('express');
const {
  applyForLoan,
  getUserLoans,
  getLoanById,
  updateLoanStatus,
} = require('../controllers/loanController');
const {
  authMiddleware,
  adminMiddleware,
  validationMiddleware,
} = require('../middlewares');
const { body, param } = require('express-validator');

const router = express.Router();

router.get('/', authMiddleware, getUserLoans);

router.post(
  '/',
  [
    authMiddleware,
    body('amount')
      .isFloat({ gt: 0 })
      .withMessage('Amount must be a positive number.'),
    body('purpose').notEmpty().withMessage('Purpose is required.'),
    body('duration')
      .isInt({ gt: 0 })
      .withMessage('Duration must be a positive integer.'),
    validationMiddleware,
  ],
  applyForLoan
);

router.get(
  '/:id',
  [
    authMiddleware,
    param('id').isInt().withMessage('Loan ID must be an integer.'),
    validationMiddleware,
  ],
  getLoanById
);

router.patch(
  '/:id/status',
  [
    authMiddleware,
    adminMiddleware,
    param('id').isInt().withMessage('Loan ID must be an integer.'),
    body('status')
      .isIn(['Approved', 'Rejected'])
      .withMessage('Status must be either "Approved" or "Rejected".'),
    validationMiddleware,
  ],
  updateLoanStatus
);

module.exports = router;
