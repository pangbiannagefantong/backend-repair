const mongoose = require('mongoose');

const adminUser = new mongoose.Schema({
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
        default: ''
    },
    job: {
        type: String,
        default: '职位未设置'
    },
    nickName: {
        type: String,
        default: '管理员'
    },
    sex: {
        type: String,
        default: ''
    },
    user_type: {
        type: Number,
        default: 0                  //0 管理员  1维修员  2学生
    },
    userName: {
        type: Number,
        default: '000000'
    }

},{versionKey: false, timestamps: {createdAt: 'createdTime', updatedAt: 'updatedTime'}})

module.exports = mongoose.model('adminUser', adminUser);
