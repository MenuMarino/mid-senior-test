const { body, param, query } = require('express-validator');

const getUserLoansValidation = [
  query('cursor')
    .optional()
    .isISO8601()
    .withMessage('Cursor must be a valid date.'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50.'),
];

const applyForLoanValidation = [
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number.'),
  body('purpose').notEmpty().withMessage('Purpose is required.'),
  body('duration')
    .isInt({ gt: 0 })
    .withMessage('Duration must be a positive integer.'),
];

const getLoanByIdValidation = [
  param('id').isInt().withMessage('Loan ID must be an integer.'),
];

const updateLoanStatusValidation = [
  param('id').isInt().withMessage('Loan ID must be an integer.'),
  body('status')
    .isIn(['Approved', 'Rejected'])
    .withMessage('Status must be either "Approved" or "Rejected".'),
];

const getLoanPaymentsValidation = [
  param('id').isInt().withMessage('Loan ID must be an integer.'),
  query('cursor')
    .optional()
    .isISO8601()
    .withMessage('Cursor must be a valid date.'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50.'),
];

module.exports = {
  getUserLoansValidation,
  applyForLoanValidation,
  getLoanByIdValidation,
  updateLoanStatusValidation,
  getLoanPaymentsValidation,
};
