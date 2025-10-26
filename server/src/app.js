const express = require('express');
const app = express();

app.use(express.json());

// Базовый тестовый маршрут
app.get('/', (req, res) => {
    res.send('Сервер работает ✅');
});

module.exports = app;
require('./config/db');

const sequelize = require('./config/db');
require('./models'); // Подключаем модели и связи

sequelize.sync({ alter: true }) // Создаёт таблицы автоматически
    .then(() => console.log("📌 Таблицы синхронизированы"))
    .catch(err => console.error("❌ Ошибка синхронизации:", err));
