const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const { validateRegistration, validateLogin } = require('../middleware/validation');

// Регистрация с валидацией
router.post('/register', validateRegistration, authController.register);

// Вход с валидацией  
router.post('/login', validateLogin, authController.login);

// Получение данных текущего пользователя (требует авторизации)
router.get('/me', auth, authController.getMe);

module.exports = router;

router.post('/logout', auth, authController.logout);