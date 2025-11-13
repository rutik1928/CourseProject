const { Ad, Car, User } = require('../models');

// Получить все объявления
exports.getAllAds = async (req, res) => {
    try {
        const ads = await Ad.findAll({
            where: { status: 'approved' },
            include: [Car, User]
        });
        res.json(ads);
    } catch (error) {
        console.error('Ошибка получения объявлений:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Получить все объявления для модерации (только для админов)
exports.getAdsForModeration = async (req, res) => {
    try {
        const ads = await Ad.findAll({
            where: { status: 'pending' },
            include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        });
        res.json(ads);
    } catch (error) {
        console.error('Ошибка получения объявлений для модерации:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Обновить статус объявления (только для админов)
exports.updateAdStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ad = await Ad.findByPk(id);
        if (!ad) {
            return res.status(404).json({ message: 'Объявление не найдено' });
        }

        ad.status = status;
        await ad.save();

        res.json({ message: 'Статус объявления обновлен', ad });
    } catch (error) {
        console.error(`Ошибка обновления статуса объявления ${req.params.id}:`, error);
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
        const { title, description, price, mileage, color, car_condition, carId } = req.body;
        const ad = await Ad.create({
            title,
            description,
            price,
            mileage,
            color,
            car_condition,
            car_id: carId,
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

// Получить объявления текущего пользователя
exports.getMyAds = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { status } = req.query;

        let whereClause = { user_id: userId };
        if (status && status !== 'all') {
            whereClause.status = status;
        }

        const ads = await Ad.findAll({
            where: whereClause,
            include: [{ model: Car, as: 'Car' }]
        });

        res.json(ads);
    } catch (error) {
        console.error('Ошибка при получении объявлений пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};