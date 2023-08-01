const { getAll, create, getOne, remove, update,setNewsImg } = require('../controllers/news.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const routerNews = express.Router();

routerNews.route('/')
    .get(getAll)
    .post(verifyJWT,create);

routerNews.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);
routerNews.route('/:id/images')
    .post(setNewsImg)
module.exports = routerNews;