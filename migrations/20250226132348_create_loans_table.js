/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('loans', function (table) {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.float('amount').notNullable();
    table.string('purpose').notNullable();
    table.integer('duration').notNullable();
    table
      .enum('status', ['Pending', 'Approved', 'Rejected'])
      .defaultTo('Pending');
    table.float('total_paid').defaultTo(0);
    table.float('remaining_balance').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('loans');
};
