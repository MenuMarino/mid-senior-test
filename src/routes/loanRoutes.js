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
const {
  getUserLoansValidation,
  applyForLoanValidation,
  getLoanByIdValidation,
  updateLoanStatusValidation,
  getLoanPaymentsValidation,
} = require('../validations/loanValidation');
const router = express.Router();

router.get(
  '/',
  [authMiddleware, ...getUserLoansValidation, validationMiddleware],
  getUserLoans
);

router.post(
  '/',
  [authMiddleware, ...applyForLoanValidation, validationMiddleware],
  applyForLoan
);

router.get(
  '/:id',
  [authMiddleware, ...getLoanByIdValidation, validationMiddleware],
  getLoanById
);

router.patch(
  '/:id/status',
  [
    authMiddleware,
    adminMiddleware,
    ...updateLoanStatusValidation,
    validationMiddleware,
  ],
  updateLoanStatus
);

router.get(
  '/:id/payments',
  [authMiddleware, ...getLoanPaymentsValidation, validationMiddleware],
  getLoanPayments
);

module.exports = router;
