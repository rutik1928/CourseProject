const { Ad, Car, User } = require('../models');

// Получить все объявления
exports.getAllAds = async (req, res) => {
    try {
        const ads = await Ad.findAll({
            include: [Car, User]
        });
        res.json(ads);
    } catch (error) {
        console.error('Ошибка получения объявлений:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Получить объявление по id
exports.getAdById = async (req, res) => {
    try {
        const ad = await Ad.findByPk(req.params.id, {
            include: [Car, User]
        });
        if (!ad) {
            return res.status(404).json({ message: 'Объявление не найдено' });
        }
        res.json(ad);
    } catch (error) {
        console.error('Ошибка получения объявления:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Создать объявление
exports.createAd = async (req, res) => {
    try {
        const { title, description, price, mileage, color, car_condition, car_id } = req.body;
        const ad = await Ad.create({
            title,
            description,
            price,
            mileage,
            color,
            car_condition,
            car_id,
            user_id: req.user.userId // предполагается, что user_id берется из авторизации
        });
        res.status(201).json(ad);
    } catch (error) {
        console.error('Ошибка создания объявления:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Обновить объявление
exports.updateAd = async (req, res) => {
    try {
        const ad = await Ad.findByPk(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Объявление не найдено' });
        }
        await ad.update(req.body);
        res.json(ad);
    } catch (error) {
        console.error('Ошибка обновления объявления:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Удалить объявление
exports.deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findByPk(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Объявление не найдено' });
        }
        await ad.destroy();
        res.json({ message: 'Объявление удалено' });
    } catch (error) {
        console.error('Ошибка удаления объявления:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};