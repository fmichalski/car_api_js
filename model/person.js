const knex = require('../configuration/database');

const Person = {
  getAll({ page, limit, sortBy, order, filter }) {
    return knex('person')
      .where('name', 'like', `%${filter}%`)
      .orderBy(sortBy, order)
      .limit(limit)
      .offset((page - 1) * limit);
  },
  getAllSimple() {
    return knex('person').select('*');
  },
  getById(id) {
    return knex('person').where({ id }).first();
  },
  create(person) {
    return knex('person').insert(person).returning('*');
  },
  update(id, person) {
    return knex('person').where({ id }).update(person).returning('*');
  },
  delete(id) {
    return knex('person').where({ id }).del();
  }
};

module.exports = Person;