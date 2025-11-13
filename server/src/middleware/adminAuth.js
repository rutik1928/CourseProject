const { User } = require('../models');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Доступ запрещен: требуется роль администратора' });
        }
        next();
    } catch (error) {
        console.error('Admin auth middleware error:', error);
        res.status(500).json({ message: 'Ошибка сервера при проверке прав администратора' });
    }
};