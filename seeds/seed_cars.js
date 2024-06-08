/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('car').del();
  await knex('car').insert([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2015, person_id: 1 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2018, person_id: 2 },
    { id: 3, make: 'Ford', model: 'Focus', year: 2017, person_id: 1 }
  ]);
};
