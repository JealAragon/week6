const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    decription: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    //catedoryId
});

module.exports = Product;