const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Получаем токен из заголовка
        const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            return res.status(401).json({ error: 'Токен не предоставлен' });
        }

        // Проверяем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Добавляем ID пользователя в запрос
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Неверный токен' });
    }
};