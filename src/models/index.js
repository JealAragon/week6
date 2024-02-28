const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");
const Cart = require("./Cart");
const Purchase = require("./Purchase");
const ProductImg = require("./ProductImg");

Product.belongsTo(Category) // product-> categoryId 
Category.hasMany(Product)

Cart.belongsTo(User) // cart -> userId
User.hasMany(Cart)

Cart.belongsTo(Product)// cart -> productId
Product.hasMany(Cart)


Purchase.belongsTo(User) // purchase -> userId
User.hasMany(Purchase)

Purchase.belongsTo(Product)// purchase -> productId
Product.hasMany(Purchase)


ProductImg.belongsTo(Product)// ProductoImg -> porductId
Product.hasMany(ProductImg)

