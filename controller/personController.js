const Person = require('../model/person');
const Car = require('../model/car');

const getPeople = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;
    const people = await Person.getAll({ page, limit, sortBy, order, filter });
    res.render('people', { people, page: parseInt(page, 10), limit: parseInt(limit, 10), sortBy, order, filter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersonById = async (req, res) => {
  try {
    const person = await Person.getById(req.params.id);
    const cars = await Car.getByPersonId(req.params.id);
    res.render('personDetail', { person, cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreatePersonPage = (req, res) => {
  res.render('createPerson');
};

const getEditPersonPage = async (req, res) => {
  try {
    const person = await Person.getById(req.params.id);
    res.render('editPerson', { person });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPerson = async (req, res) => {
  try {
    const { name, email } = req.body;
    await Person.create({ name, email });
    res.redirect('/people');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePerson = async (req, res) => {
  try {
    const { name, email } = req.body;
    await Person.update(req.params.id, { name, email });
    res.redirect('/people');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePerson = async (req, res) => {
  try {
    await Person.delete(req.params.id);
    res.redirect('/people');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPeople,
  getPersonById,
  getCreatePersonPage,
  getEditPersonPage,
  createPerson,
  updatePerson,
  deletePerson
};