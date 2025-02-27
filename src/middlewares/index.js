const authMiddleware = require('./authMiddleware');
const adminMiddleware = require('./adminMiddleware');
const validationMiddleware = require('./validationMiddleware');
const { apiLimiter, authLimiter } = require('./rateLimitMiddleware');
const errorHandler = require('./errorMiddleware');

module.exports = {
  authMiddleware,
  adminMiddleware,
  validationMiddleware,
  apiLimiter,
  authLimiter,
  errorHandler,
};
