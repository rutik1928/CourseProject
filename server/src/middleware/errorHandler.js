module.exports = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Неверный токен' });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Токен истек' });
    }

    res.status(500).json({ 
        error: 'Внутренняя ошибка сервера',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
};