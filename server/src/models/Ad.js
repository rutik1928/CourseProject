const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ad = sequelize.define('Ad', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    mileage: { type: DataTypes.INTEGER },
    color: { type: DataTypes.STRING(50) },
    car_condition: {
        type: DataTypes.ENUM('excellent', 'good', 'satisfactory', 'bad'),
        defaultValue: 'good'
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Ad;
