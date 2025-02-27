const logger = require('../utils/logger');

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    logger.warn(
      `Unauthorized access attempt by user ${req.user?.id || 'unknown'}`
    );
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  next();
};

module.exports = adminMiddleware;
