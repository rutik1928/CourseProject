const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Маршруты для администратора
router.get('/ads', auth, adminAuth, adController.getAdsForModeration);
router.put('/ads/:id/status', auth, adminAuth, adController.updateAdStatus);

module.exports = router;