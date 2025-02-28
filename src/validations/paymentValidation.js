const { body } = require('express-validator');

const paymentValidation = [
  body('loanId').isInt().withMessage('Loan ID must be an integer.'),
  body('amountPaid')
    .isFloat({ gt: 0 })
    .withMessage('Amount paid must be a positive number.'),
];

module.exports = {
  paymentValidation,
};
