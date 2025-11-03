const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 
        message: 'Endpoint для комментариев - будет реализован в Этапе 4',
        planned_endpoints: [
            'GET /api/comments/ad/:adId - комментарии объявления',
            'POST /api/comments - добавить комментарий',
            'PUT /api/comments/:id - редактировать комментарий',
            'DELETE /api/comments/:id - удалить комментарий'
        ]
    });
});

module.exports = router;