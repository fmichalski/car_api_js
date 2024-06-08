const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { auth, authorize } = require('../middlewares/auth');

router.get('/', auth, authorize('admin'), userController.getAllUsers);
router.get('/create', auth, authorize('admin'), userController.getCreateUserPage);
router.post('/', auth, authorize('admin'), userController.createUser);
router.get('/edit/:id', auth, authorize('admin'), userController.getEditUserPage);
router.post('/edit/:id', auth, authorize('admin'), userController.updateUser);
router.post('/delete/:id', auth, authorize('admin'), userController.deleteUser);

module.exports = router;