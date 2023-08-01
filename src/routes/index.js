const express = require('express');
const routerUser = require('./user.route');
const routerCategory = require('./category.router');
const routerNews = require('./news.router');
const routerNewsImg = require('./newsImg.router');
const routerFavorite = require('./favorite.router');
const routerPurchase = require('./purchase.router');

const router = express.Router();

router.use('/user',routerUser)
router.use('/category',routerCategory)
router.use('/news',routerNews)
router.use('/newsImg',routerNewsImg)
router.use('/favorite',routerFavorite)
router.use('/purchase',routerPurchase)

module.exports = router;