const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const {
  apiLimiter,
  authLimiter,
} = require('./middlewares/rateLimitMiddleware');

const app = express();

app.use(apiLimiter);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/users', authLimiter, authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Personal Loan Application is running!' });
});

module.exports = app;
