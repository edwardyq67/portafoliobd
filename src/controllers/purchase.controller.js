const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const Favorite = require('../models/Favorite');

const getAll = catchError(async(req, res) => {
    const purchase=await Purchase.findAll({where:{userId: req.user.id}})
    return res.json(purchase)
});
const buyCart=catchError(async(req,res)=>{
    const cartProduct=await Favorite.findAll({
        where:{userId:req.user.id},
        attributes:['userId','newsId','rate'],
        raw:true
    });
    console.log(cartProduct)
    await Purchase.bulkCreate(cartProduct)
    await Favorite.destroy({where:{userId:req.user.id}})
    return res.json(cartProduct)
})

module.exports = {
    getAll,
    buyCart
}