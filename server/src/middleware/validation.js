const { body, validationResult } = require('express-validator');

// Валидация регистрации
exports.validateRegistration = [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
    body('name').notEmpty().withMessage('Имя обязательно'),
    body('phone').notEmpty().withMessage('Телефон обязателен'),
    (req, res, next) => {
        console.log('Validation middleware: Request body:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation middleware: Errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('Validation middleware: No errors, proceeding...');
        next();
    }
];

// Валидация входа
exports.validateLogin = [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').notEmpty().withMessage('Пароль обязателен'),
    (req, res, next) => {
        console.log('Validation middleware login: Request body:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation middleware login: Errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];