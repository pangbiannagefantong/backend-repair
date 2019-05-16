const mongoose = require('mongoose');
const validator = require('validator');
const smsModel = require('../model/smsCode');
const codeModel = require('../model/codeAdded');
const adminUserModel = require('../model/adminUser');


//admin添加管理员  phone, desc, avatar, nickName, password, job, sex
async function addAdmin(req, res, next) {
    try {
        const {phone, avatar, desc, nickName, password, job, sex} = req.body;
        const phoneStatus = validator.isMobilePhone(phone, 'zh-CN');
        if (phoneStatus) {
            const data = await adminUserModel.findOne({phone});
            if (data) {
                res.json({
                    code: 400,
                    msg: '该用户已注册'
                })
            } else {
                await adminUserModel.create({avatar, desc, nickName, phone, job, sex, password});
                await codeModel.create({
                    phone, password,
                    classification: '管理员'
                });     //数据库中存入已创建账号
                await
                    res.json({
                        code: 200,
                        msg: '管理员用户注册成功'
                    })
            }
        } else {
            res.json({
                code: 400,
                msg: '该手机号不是合法的手机号'
            })
        }
    } catch (err) {
        next(err)
    }
}

//get管理员信息
async function getAdmin(req, res, next) {
    try {
        const user_type = req.user.user_type;
        console.log(user_type);
        if (user_type === 0) {
            const data = await adminUserModel.find()
            res.json({
                code: 200,
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '查看管理员权限不足！'
            })
        }
    } catch (err) {
        next(err)
    }
}

//删除管理员
async function deleteAdminUser (req, res, next) {
    try {
        const user_type = req.user.user_type;
        if (user_type === 0) {
            const {id} = req.params;
            const data = await adminUserModel.deleteOne({_id: id});
            res.json({
                code: 200,
                msg: data
            })
        } else {
            res.json({
                code: 400,
                msg: '删除维修员权限不够！'
            })
        }
    } catch(err){
        next(err)
    }
}


module.exports = {
    addAdmin,
    getAdmin,
    deleteAdminUser
};
