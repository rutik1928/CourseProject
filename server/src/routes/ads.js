const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');

// Получить все объявления
router.get('/', adController.getAllAds);

// Создать объявление (требуется авторизация)
router.post('/', auth, adController.createAd);

// Получить объявление по id
router.get('/:id', adController.getAdById);

// Обновить объявление (требуется авторизация)
router.put('/:id', auth, adController.updateAd);

// Удалить объявление (требуется авторизация)
router.delete('/:id', auth, adController.deleteAd);

module.exports = router;