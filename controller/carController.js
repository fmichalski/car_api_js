const Car = require('../model/car');
const Person = require('../model/person');

const getAllCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'make', order = 'asc', filter = '' } = req.query;
    const cars = await Car.getAll({ page, limit, sortBy, order, filter });
    res.render('cars', { cars, page: parseInt(page, 10), limit: parseInt(limit, 10), sortBy, order, filter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.getById(req.params.id);
    res.render('carDetail', { car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreateCarPage = async (req, res) => {
  try {
    const people = await Person.getAllSimple();
    res.render('createCar', { people });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEditCarPage = async (req, res) => {
  try {
    const car = await Car.getById(req.params.id);
    const people = await Person.getAllSimple();
    res.render('editCar', { car, people });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCar = async (req, res) => {
  try {
    const { make, model, year, person_id } = req.body;
    await Car.create({ make, model, year, person_id });
    res.redirect('/cars');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { make, model, year, person_id } = req.body;
    await Car.update(req.params.id, { make, model, year, person_id });
    res.redirect('/cars');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.delete(req.params.id);
    res.redirect('/cars');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  getCreateCarPage,
  getEditCarPage,
  createCar,
  updateCar,
  deleteCar
};