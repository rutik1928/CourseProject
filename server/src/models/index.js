const User = require('./User');
const Car = require('./Car');
const Ad = require('./Ad');
const Comment = require('./Comment');
const CarImage = require('./CarImage');
const Favorite = require('./Favorite');

// --- Связи USERS ---
User.hasMany(Ad, { foreignKey: 'user_id' });
Ad.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// --- Связи CARS ---
Car.hasMany(Ad, { foreignKey: 'car_id' });
Ad.belongsTo(Car, { foreignKey: 'car_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// --- Связи COMMENTS ---
Ad.hasMany(Comment, { foreignKey: 'ad_id' });
Comment.belongsTo(Ad, { foreignKey: 'ad_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.hasMany(Comment, { foreignKey: 'parent_id', as: 'replies' });
Comment.belongsTo(Comment, { foreignKey: 'parent_id', as: 'parent' });

// --- Связи CAR_IMAGES ---
Ad.hasMany(CarImage, { foreignKey: 'ad_id' });
CarImage.belongsTo(Ad, { foreignKey: 'ad_id' });

// --- Связи FAVORITES ---
User.belongsToMany(Ad, { through: Favorite, foreignKey: 'user_id', otherKey: 'ad_id' });
Ad.belongsToMany(User, { through: Favorite, foreignKey: 'ad_id', otherKey: 'user_id' });

module.exports = {
    User,
    Car,
    Ad,
    Comment,
    CarImage,
    Favorite
};
