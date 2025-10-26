const express = require('express');
const app = express();

app.use(express.json());

// Базовый тестовый маршрут
app.get('/', (req, res) => {
    res.send('Сервер работает ✅');
});

module.exports = app;
