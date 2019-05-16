const mongoose = require('mongoose');

const swiper = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    index: {
        type: Number,
        default: 1
    },
    title: String,
    img: String
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTIme'}});


module.exports = mongoose.model('swiper', swiper);
