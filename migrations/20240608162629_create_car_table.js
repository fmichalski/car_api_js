/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('car', function (table) {
        table.increments('id').primary();
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.integer('year').notNullable();
        table.integer('person_id').unsigned().references('id').inTable('person').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('car');
};
