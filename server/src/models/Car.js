const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Car = sequelize.define('Car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brand: { type: DataTypes.STRING(100), allowNull: false },
    model: { type: DataTypes.STRING(100), allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    generation: { type: DataTypes.STRING(100) },
    body_type: {
        type: DataTypes.ENUM('sedan', 'hatchback', 'SUV', 'coupe', 'convertible', 'minivan', 'pickup')
    },
    engine_type: {
        type: DataTypes.ENUM('gasoline', 'diesel', 'hybrid', 'electric')
    },
    transmission: {
        type: DataTypes.ENUM('manual', 'automatic', 'robot', 'variator')
    },
    drive_type: {
        type: DataTypes.ENUM('front', 'rear', 'all')
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['brand', 'model', 'year', 'generation']
        }
    ]
});

module.exports = Car;
