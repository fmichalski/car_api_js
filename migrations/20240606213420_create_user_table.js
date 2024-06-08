/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary();
        table.string('login').notNullable().unique();
        table.string('password').notNullable();
        table.string('role').notNullable().defaultTo('user');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
