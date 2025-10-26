const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CarImage = sequelize.define('CarImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image_url: { type: DataTypes.STRING(500), allowNull: false },
    is_main: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: false
});

module.exports = CarImage;
