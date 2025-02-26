const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/users', authRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Personal Loan Application is running!' });
});

module.exports = app;
