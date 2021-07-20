const express = require('express');
const authController = require('../controllers/authController');
const autho = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);  
router.post('/login', authController.login);
router.get('/me', autho.protect, authController.getMe);

module.exports = router;