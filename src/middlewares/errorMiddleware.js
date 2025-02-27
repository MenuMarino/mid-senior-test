const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
