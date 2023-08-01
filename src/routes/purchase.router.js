const { getAll,buyCart } = require('../controllers/purchase.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerPurchase = express.Router();

routerPurchase.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,buyCart)

module.exports = routerPurchase;