const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Product.belongsTo(Category) // product-> categoryId 
Category.hasMany(Product)