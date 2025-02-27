const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: {
    message: 'Too many requests from this IP, please try again later.',
  },
  headers: true,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutes
  max: 10,
  message: {
    message: 'Too many authentication attempts, please try again later.',
  },
  headers: true,
});

module.exports = { apiLimiter, authLimiter };
