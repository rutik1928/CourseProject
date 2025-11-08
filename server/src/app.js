const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.use(express.static(path.join(__dirname, '..', '..', 'client')));

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/comments', require('./routes/comments'));

// Обработка ошибок
app.use(require('./middleware/errorHandler'));

module.exports = app;