const { getAll,create,remove } = require('../controllers/newsImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const routerNewsImg = express.Router();

routerNewsImg.route('/')
    .get(getAll)

routerNewsImg.route('/')
    .post(upload.single('image'), create);
    
routerNewsImg.route('/:id')
            .delete(remove)
module.exports = routerNewsImg;