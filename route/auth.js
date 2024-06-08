const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/login', userController.getLoginPage);
router.post('/login', userController.loginUser);
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);
router.get('/logout', userController.logoutUser);

module.exports = router;