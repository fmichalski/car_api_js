/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  await knex('user').insert([
    { id: 1, login: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, login: 'user', password: 'user123', role: 'user' }
  ]);
};
