const db = require('../config/db');

const createUser = async (name, email, hashedPassword) => {
  const newUser = await db('users')
    .insert({ name, email, password: hashedPassword })
    .returning(['id', 'name', 'email', 'created_at']);
  return newUser[0];
};

const getUserByEmail = async (email) => {
  const user = await db('users').where({ email }).first();
  return user;
};

module.exports = { createUser, getUserByEmail };
