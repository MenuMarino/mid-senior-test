const express = require('express');
const {
  applyForLoan,
  getUserLoans,
  getLoanById,
  updateLoanStatus,
} = require('../controllers/loanController');
const { getLoanPayments } = require('../controllers/paymentController');
const {
  authMiddleware,
  adminMiddleware,
  validationMiddleware,
} = require('../middlewares');
const { body, param, query } = require('express-validator');

const router = express.Router();

router.get(
  '/',
  [
    authMiddleware,
    query('cursor')
      .optional()
      .isISO8601()
      .withMessage('Cursor must be a valid date.'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50.'),
    validationMiddleware,
  ],
  getUserLoans
);

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

router.get(
  '/:id/payments',
  [
    authMiddleware,
    param('id').isInt().withMessage('Loan ID must be an integer.'),
    query('cursor')
      .optional()
      .isISO8601()
      .withMessage('Cursor must be a valid date.'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50.'),
    validationMiddleware,
  ],
  getLoanPayments
);

module.exports = router;
