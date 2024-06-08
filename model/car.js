const knex = require('../configuration/database');

const Car = {
  getAll({ page = 1, limit = 10, sortBy = 'make', order = 'asc', filter = '' } = {}) {
    return knex('car')
      .join('person', 'car.person_id', 'person.id')
      .select('car.*', 'person.name as owner_name')
      .where('make', 'like', `%${filter}%`)
      .orderBy(sortBy, order)
      .limit(limit)
      .offset((page - 1) * limit);
  },
  getByPersonId(person_id) {
    return knex('car').where({ person_id }).select('*');
  },
  getById(id) {
    return knex('car')
      .join('person', 'car.person_id', 'person.id')
      .select('car.*', 'person.name as owner_name')
      .where('car.id', id)
      .first();
  },
  create(car) {
    return knex('car').insert(car).returning('*');
  },
  update(id, car) {
    return knex('car').where({ id }).update(car).returning('*');
  },
  delete(id) {
    return knex('car').where({ id }).del();
  }
};

module.exports = Car;