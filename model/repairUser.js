const mongoose = require('mongoose');

const repairUser = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2549721190,228932466&fm=27&gp=0.jpg'
    },
    userName: {          //用户名必传
        type: String,
        required: true,
        default: '111111'
    },
    desc: {
        type: String,
        default: ''
    },
    job: {
        type: String,
        default: '维修员'
    },
    nickName: {
        type: String,
        default: '测试账号'
    },
    phone: {
        type: Number,
        unique: true
    },
    password: String,
    sex: {
        type: String,
        default: ''
    },
    user_type: {
        type: Number,
        default: 1          //0 管理员  1维修员  2学生
    }
},{versionKey: false, timestamps: {createdAt: 'createdTime', updatedAt: 'updatedTime'}});

module.exports = mongoose.model('repairUser', repairUser);
