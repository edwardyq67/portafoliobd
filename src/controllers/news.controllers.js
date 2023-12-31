const catchError = require('../utils/catchError');
const News = require('../models/News');
const Category = require('../models/Category');
const NewsImg = require('../models/NewsImg');
const { Op } = require("sequelize");

const getAll = catchError(async(req, res) => {
    const {headline,categoryId}=req.query
    const where={}
    if(headline) where.headline={[Op.iLike]:`%${headline}%`}
    if(categoryId) where.categoryId=categoryId
    const results = await News.findAll({include:[Category,NewsImg],
    where:where
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await News.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await News.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    
    const { id } = req.params;
    const result = await News.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});
const setNewsImg=catchError(async(req,res)=>{
    const {id}=req.params
    const news=await News.findByPk(id)
    if(!news)return res.json({message:"no existe"}).status(404)
    await news.setNewsImgs(req.body)//el modelo de NewsImg
    const image=await news.getNewsImgs()
    return res.json(image)

})
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setNewsImg
}