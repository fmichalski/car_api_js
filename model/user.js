const knex = require('../configuration/database');

const validateLogin = async (login) => {
  const user = await knex('user').where({ login }).first();
  if (user) {
    throw new Error('Login must be unique');
  }
};

const validatePassword = (password) => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
};

const User = {
  async create(user) {
    await validateLogin(user.login);
    validatePassword(user.password);

    return knex('user').insert(user).returning('*');
  },
  getAll() {
    return knex('user').select('*');
  },
  getById(id) {
    return knex('user').where({ id }).first();
  },
  getByLogin(login) {
    return knex('user').where({ login }).first();
  },
  async update(id, user) {
    if (user.login) {
      await validateLogin(user.login);
    }
    if (user.password) {
      validatePassword(user.password);
    }

    return knex('user').where({ id }).update(user).returning('*');
  },
  delete(id) {
    return knex('user').where({ id }).del();
  }
};

module.exports = User;