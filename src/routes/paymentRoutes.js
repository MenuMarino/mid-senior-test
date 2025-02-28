const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/paymentController');
const { authMiddleware, validationMiddleware } = require('../middlewares');
const { paymentValidation } = require('../validations/paymentValidation');

router.post(
  '/',
  [authMiddleware, ...paymentValidation, validationMiddleware],
  makePayment
);

module.exports = router;
