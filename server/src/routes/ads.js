const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Получить все объявления
router.get('/', adController.getAllAds);

// Получить объявления текущего пользователя (требуется авторизация)
router.get('/my', auth, adController.getMyAds);

// Получить объявление по ID
router.get('/:id', adController.getAdById);

// Создать объявление (требуется авторизация)
router.post('/', auth, adController.createAd);

// Обновить объявление (требуется авторизация)
router.put('/:id', auth, adController.updateAd);

// Удалить объявление (требуется авторизация)
router.delete('/:id', auth, adController.deleteAd);

module.exports = router;