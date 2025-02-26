const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log(`Database connected`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
  }

  console.log(`Server running on http://localhost:${PORT}`);
});
