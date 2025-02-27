/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.seed = async function (knex) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const existingAdmin = await knex('users')
    .where({ email: adminEmail })
    .first();
  if (existingAdmin) {
    console.log('Admin user already exists. Skipping seed.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await knex('users').insert({
    name: 'Admin User',
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
    created_at: new Date(),
  });

  console.log('Admin user created successfully!');
};
