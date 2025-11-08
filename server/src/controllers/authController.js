const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Импортируем модель User

// Регистрация пользователя
exports.register = async (req, res) => {
  try {
    console.log('Register function called');
    const { name, email, password, phone } = req.body;

    console.log('Request body:', { name, email, password, phone });

    if (!name || !email || !password || !phone) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });
    console.log('User inserted into database, user:', user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated');

    res.status(201).json({ message: 'User registered successfully', token, redirectUrl: '/' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration error', error: error.message });
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
            attributes: ['id', 'email', 'name', 'phone', 'role', 'created_at']
        });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(user);
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

exports.logout = (req, res) => {
    // В JWT выход реализуется на клиенте - удалением токена
    res.json({ message: 'Выход выполнен успешно' });
};