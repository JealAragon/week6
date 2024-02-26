const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('Purchase', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //userId
    //productId
});

module.exports = Purchase;