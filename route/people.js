const express = require('express');
const router = express.Router();
const personController = require('../controller/personController');
const { auth, authorize } = require('../middlewares/auth');

router.get('/', auth, authorize(['user', 'admin']), personController.getPeople);
router.get('/create', auth, authorize(['admin']), personController.getCreatePersonPage);
router.post('/', auth, authorize(['admin']), personController.createPerson);
router.get('/:id', auth, authorize(['user', 'admin']), personController.getPersonById);
router.get('/edit/:id', auth, authorize(['admin']), personController.getEditPersonPage);
router.post('/edit/:id', auth, authorize(['admin']), personController.updatePerson);
router.post('/delete/:id', auth, authorize(['admin']), personController.deletePerson);

module.exports = router;