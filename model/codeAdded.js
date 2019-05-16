const mongoose = require('mongoose');  //已注册用户（管理员，用户等）

const codeAdded = new mongoose.Schema({
    phone: String,
    // code: String,
    password: String,
    classification: {
        type: String,
        default: ''
    }
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}});

module.exports = mongoose.model('codeAdded', codeAdded);
