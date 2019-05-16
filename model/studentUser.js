const mongoose = require('mongoose');

const studentUser = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    password: {
        type:  String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2549721190,228932466&fm=27&gp=0.jpg'
    },
    desc: {
        type: String,
        default: '用户'
    },
    nickName: {
        type: String,
        default: '学生123'
    },
    sex: {
        type: String,
        default: ''
    },
    user_type: {
        type: Number,
        default: 2      //0 管理员  1维修员  2学生
    },
},{versionKey: false, timestamps: {createdAt: 'createdTime', updatedAt: 'updatedTime'}})

module.exports = mongoose.model('studentUser', studentUser);
