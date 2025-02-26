/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payments', function (table) {
    table.increments('id').primary();
    table
      .integer('loan_id')
      .unsigned()
      .references('id')
      .inTable('loans')
      .onDelete('CASCADE');
    table.float('amount_paid').notNullable();
    table.date('payment_date').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payments');
};
