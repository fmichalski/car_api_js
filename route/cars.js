const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');
const { auth, authorize } = require('../middlewares/auth');

router.get('/', auth, authorize(['user', 'admin']), carController.getAllCars);
router.get('/create', auth, authorize(['admin']), carController.getCreateCarPage);
router.post('/', auth, authorize(['admin']), carController.createCar);
router.get('/:id', auth, authorize(['user', 'admin']), carController.getCarById);
router.get('/edit/:id', auth, authorize(['admin']), carController.getEditCarPage);
router.post('/edit/:id', auth, authorize(['admin']), carController.updateCar);
router.post('/delete/:id', auth, authorize(['admin']), carController.deleteCar);

module.exports = router;