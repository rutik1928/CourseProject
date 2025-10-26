const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorite = sequelize.define('Favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    ad_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'ad_id']
        }
    ]
});

module.exports = Favorite;
