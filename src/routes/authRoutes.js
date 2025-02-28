const express = require('express');
const { register, login } = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares');
const {
  registerValidation,
  loginValidation,
} = require('../validations/authValidation');

const router = express.Router();

router.post(
  '/register',
  [...registerValidation, validationMiddleware],
  register
);

router.post('/login', [...loginValidation, validationMiddleware], login);

module.exports = router;
