const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});


// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/comments', require('./routes/comments'));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});