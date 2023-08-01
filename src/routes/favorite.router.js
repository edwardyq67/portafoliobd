const { getAll, create, getOne, remove, update } = require('../controllers/favorites.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerFavorite = express.Router();

routerFavorite.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

routerFavorite.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerFavorite;