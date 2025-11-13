const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'src')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'index.html'));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'index.html'));
});
app.get('/create-ad.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'create-ad.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'login.html'));
});
app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'profile.html'));
});
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'register.html'));
});
app.get('/create-car.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'create-car.html'));
});
app.get('/cars.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'cars.html'));
});
app.get('/ad-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'ad-details.html'));
});
app.get('/my-ads.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'my-ads.html'));
});
app.get('/moderation.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'pages', 'moderation.html'));
});

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/admin', require('./routes/admin'));

// Обработка ошибок
app.use(require('./middleware/errorHandler'));

module.exports = app;