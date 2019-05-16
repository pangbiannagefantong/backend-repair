const swiperModel = require('../model/swiper');
const mongoose = require('mongoose');

//添加轮播图  title, img, index, id
async function addSwiper(req, res, next) {
    try {
        const {title, img, index = 1} = req.body;
        await swiperModel.create({
            title, img, index
        })
        res.json({
            code: 200,
            msg: '添加轮播图成功'
        })
    } catch (err) {
        next(err)
    }
}

//查看轮播图
async function getSwiper (req, res, next) {
    try {
        const data = await swiperModel.find().sort({index: 1, _id: -1});
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next (err)
    }
}

module.exports = {
    addSwiper,
    getSwiper
}
