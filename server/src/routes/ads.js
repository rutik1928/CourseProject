const express = require('express');
const router = express.Router();

// Временные заглушки - потом заменим на настоящую логику
router.get('/', (req, res) => {
    res.json({ 
        message: 'Endpoint для объявлений - будет реализован в Этапе 3',
        planned_endpoints: [
            'GET /api/ads - все объявления',
            'POST /api/ads - создать объявление', 
            'GET /api/ads/:id - одно объявление',
            'PUT /api/ads/:id - обновить объявление',
            'DELETE /api/ads/:id - удалить объявление'
        ]
    });
});

module.exports = router;