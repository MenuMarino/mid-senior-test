const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters.'),
    validationMiddleware,
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    validationMiddleware,
  ],
  login
);

module.exports = router;
