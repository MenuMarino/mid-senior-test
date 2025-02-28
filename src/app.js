const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const correlationId = require('express-correlation-id');

const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { apiLimiter, authLimiter, errorHandler } = require('./middlewares/');

const app = express();

app.use(apiLimiter);
app.use(correlationId());
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

app.use(errorHandler);

module.exports = app;
