const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Импортируем модель User

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
        console.log('📝 Регистрация:', req.body);
        
        const { email, password, name, phone } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        console.log('🔍 Поиск пользователя:', existingUser ? 'найден' : 'не найден');
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Пользователь с таким email уже существует' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('🔐 Пароль захэширован');

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            phone
        });
        console.log('✅ Пользователь создан в БД:', user.id);

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h'
        });
        console.log('🎫 JWT токен создан');

        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            redirectUrl: '/' // Перенаправление на главную страницу
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Ошибка при регистрации: ' + error.message });
    }
};

// Вход пользователя
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ищем пользователя
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ 
                error: 'Неверный email или пароль' 
            });
        }

        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                error: 'Неверный email или пароль' 
            });
        }

        // Создаем JWT токен
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Вход выполнен успешно',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            redirectUrl: '/' // Перенаправление на главную страницу
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Ошибка при входе' });
    }
};

// Получение информации о текущем пользователе
exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
};

exports.logout = (req, res) => {
    // В JWT выход реализуется на клиенте - удалением токена
    res.json({ message: 'Выход выполнен успешно' });
};