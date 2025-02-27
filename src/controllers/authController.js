const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
const logger = require('../utils/logger');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  logger.info(`Registration attempt for ${name} with email ${email}`);

  try {
    const existingUser = await getUserByEmail(email);
    logger.info('Checking if the email already exists');

    if (existingUser) {
      logger.warn(`Failed register attempt for email: ${email}`);
      return next({ status: 400, message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(name, email, hashedPassword);
    logger.info(`New user created ${JSON.stringify(newUser)}`);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    logger.info(`Registration successful for email: ${email}`);
    res
      .status(201)
      .json({ message: 'User registered successfully!', user: newUser, token });
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    return next({ status: 500, message: error.message });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  logger.info(`Login attempt for email ${email}`);

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      logger.warn(`Failed login attempt for email: ${email}`);
      return next({ status: 400, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Incorrect password for email: ${email}`);
      return next({ status: 400, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`User logged in: ${email}. Role: ${user.role}`);
    res.json({ message: 'Login successful!', token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return next(new Error(error));
  }
};

module.exports = {
  register,
  login,
};
