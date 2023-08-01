const Category = require("./Category");
const Favorite = require("./Favorite");
const News = require("./News");
const NewsImg = require("./NewsImg");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(News)
News.belongsTo(Category)

News.hasMany(NewsImg)
NewsImg.belongsTo(News)

User.hasMany(Favorite)//uno a mucho -->
Favorite.belongsTo(User)//<--

News.hasMany(Favorite)
Favorite.belongsTo(News)
//Purchase
Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(News)
News.hasMany(Purchase)
