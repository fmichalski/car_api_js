const assert = require('assert');
const knex = require('../configuration/database');
const Person = require('../model/person');

describe('Person Model', () => {
  before(async () => {
    await knex.schema.createTable('person', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.timestamps(true, true);
    });
  });

  after(async () => {
    await knex.schema.dropTable('person');
  });

  beforeEach(async () => {
    await knex('person').del();
  });

  it('should fetch all persons', async () => {
    await Person.create({ name: 'John Doe', email: 'john@example.com' });
    const persons = await Person.getAllSimple();
    assert.strictEqual(persons.length, 1);
    assert.strictEqual(persons[0].name, 'John Doe');
  });

  it('should fetch a person by id', async () => {
    const [newPerson] = await Person.create({ name: 'John Doe', email: 'john@example.com' });
    const person = await Person.getById(newPerson.id);
    assert.strictEqual(person.name, 'John Doe');
  });

  it('should create a new person', async () => {
    const [newPerson] = await Person.create({ name: 'Jane Doe', email: 'jane@example.com' });
    const person = await Person.getById(newPerson.id);
    assert.strictEqual(person.name, 'Jane Doe');
  });

  it('should update a person', async () => {
    const [newPerson] = await Person.create({ name: 'Jane Doe', email: 'jane@example.com' });
    await Person.update(newPerson.id, { name: 'Jane Smith', email: 'jane.smith@example.com' });
    const person = await Person.getById(newPerson.id);
    assert.strictEqual(person.name, 'Jane Smith');
  });

  it('should delete a person', async () => {
    const [newPerson] = await Person.create({ name: 'Jane Doe', email: 'jane@example.com' });
    await Person.delete(newPerson.id);
    const person = await Person.getById(newPerson.id);
    assert.strictEqual(person, undefined);
  });
});