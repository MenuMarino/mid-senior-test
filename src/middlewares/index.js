const authMiddleware = require('./authMiddleware');
const adminMiddleware = require('./adminMiddleware');
const validationMiddleware = require('./validationMiddleware');

module.exports = {
  authMiddleware,
  adminMiddleware,
  validationMiddleware,
};
