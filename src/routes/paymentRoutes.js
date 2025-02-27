const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const { makePayment } = require('../controllers/paymentController');
const { authMiddleware, validationMiddleware } = require('../middlewares');

router.post(
  '/',
  [
    authMiddleware,
    body('loanId').isInt().withMessage('Loan ID must be an integer.'),
    body('amountPaid')
      .isFloat({ gt: 0 })
      .withMessage('Amount paid must be a positive number.'),
    validationMiddleware,
  ],
  makePayment
);

module.exports = router;
