const app = require('./app');
const db = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const result = await db('users').select('id').limit(1);
    logger.info(`Database connected`);
  } catch (error) {
    logger.warn(`Database connection error: ${error.message}`);
  }

  logger.info(`Server running on http://localhost:${PORT}`);
});
