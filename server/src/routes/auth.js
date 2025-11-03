const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Регистрация
router.post('/register', authController.register);

// Вход
router.post('/login', authController.login);

// Получение данных текущего пользователя (требует авторизации)
router.get('/me', auth, authController.getMe);

module.exports = router;