const express = require('express');
const authController = require('../controllers/authController');
const autho = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);  
router.post('/login', authController.login);
router.get('/me', autho.protect, authController.getMe);
router.post('/forgotpassword', authController.forgotPassword); 
router.put('/forgotpassword/:resettoken', authController.resetPassword);

module.exports = router;