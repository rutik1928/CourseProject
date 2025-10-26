const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './constraits.env' });


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Успешное подключение к MySQL');
    } catch (error) {
        console.error('Ошибка подключения к MySQL:', error);
    }
}

connectDB();

module.exports = sequelize;
