const repairUserModel = require('../model/repairUser');
const validator = require('validator');
const codeModel = require('../model/codeAdded');
const smsModel = require('../model/smsCode');
const mongoose = require('mongoose');


// 管理员添加维修员账号   avatar, phone, password, nickName, sex, job, desc
async function adminAddRepairUser (req, res, next) {
    try {
        const user_type = req.user.user_type;
        if (user_type === 0) {
            const {avatar, phone, desc, password, nickName, sex, job} = req.body;
            const data = await repairUserModel.findOne({phone});
            if (!data) {
                await repairUserModel.create({avatar, phone, desc, password, nickName, sex, job})
                await codeModel.create({
                    phone, password,
                    classification: '维修员'
                });     //数据库中存入已创建账号
                res.json({
                    code: 200,
                    msg: '维修员用户注册成功'
                })
            } else {
                res.json({
                    code: 400,
                    msg: '该用户已注册维修员'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '请先登录管理员账号再注册维修员！'
            })
        }

    } catch (err) {
        next (err)
    }
}


// 用户注册添加维修员账号    phone, code, password, nickName, sex, job
// async function addRepairUser(req, res, next) {
//     try {
//         const {phone, code, password, nickName, sex, job} = req.body;
//         const phoneStatus = validator.isMobilePhone(phone, 'zh-CN');
//         if (phoneStatus) {
//             const data = await repairUserModel.findOne({phone});
//             if (!data) {    //该用户未注册
//                 const phoneCode = await smsModel.findOne({phone}).sort({_id: -1});
//                 if (phoneCode) { //判断是否发送过验证码
//                     console.log(phoneCode.code,'phone');
//                     let smsCodeData = new Date(phoneCode.updateTime);
//                     let smsCodeTime = Math.round(smsCodeData.getTime() / 1000);
//                     let nowTime = Math.round(Date.now()/1000);
//                     console.log(phoneCode.updateTime,'time');
//                     if ((nowTime - smsCodeTime) < 60 * 5) {     //判断验证码是否在有效期
//                         if (code === phoneCode.code) {   //验证码是否正确
//                             await repairUserModel.create({phone, password, nickName, sex, job});
//                             await codeModel.create({
//                                 phone, password,
//                                 classification: '维修员'
//                             });     //数据库中存入已创建账号
//                             res.json({code: 200, msg: '用户注册成功'})
//                         } else {
//                             res.json({code: 400, msg: '验证码不正确'})
//                         }
//                     } else {               //验证码已过期
//                         res.json({code: 400, msg: '验证码已过期'})
//                     }
//                 } else {
//                     res.json({code:400, msg: '请先发送验证码'})
//                 }
//             } else {
//                 res.json({code: 400, msg: '该用户已注册'})
//             }
//         } else {
//             res.json({code: 400, msg: '该手机号不是合法的手机号'})
//         }
//     } catch (err) {
//         next (err)
//     }
// }

//删除维修员
async function deleteRepairUser (req, res, next) {
    try {
        const user_type = req.user.user_type;
        if (user_type === 0) {
            const {id} = req.params;
            const data = await repairUserModel.deleteOne({_id: id});
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

//get所有维修员信息
async function getRepairUser (req, res, next) {
    try {
        const user_type = req.user.user_type;
        if (user_type === 0) {
            let {page=1, page_size=10} = req.query;
            page = parseInt(page);
            page_size = parseInt(page_size);
            const dataList = await repairUserModel.find().select("-password").limit(page_size).skip((page-1)*page_size).sort({_id: -1})

            res.json({
                code: 200,
                data: dataList
            })
        } else {
            res.json({
                code: 400,
                msg: '查看维修员信息权限不够！'
            })
        }
    } catch (err) {
        next (err)
    }
}

//根据id查找维修员信息    id
async function getRepairById(req, res, next){
    try{
        const {id} = req.params;
        const data = await repairUserModel.findById(id).select("-password")
        if(data){
            res.json({
                code: 200,
                data,
                msg: 'success'
            })
        } else {
            res.json({
                code: 400,
                data,
                msg: '没有找到该维修员的信息'
            })
        }
    }catch(err){
        next(err)
    }
}

//获取用户数据   token
async function getUserData(req, res, next) {
    try {
        const userId = req.user.userId;
        console.log(req.user);
        const data = await repairUserModel.findOne({
            _id: mongoose.Types.ObjectId(userId)
        })
        if (data) {
            res.json({
                code: 200,
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '无法找到此人数据'
            })
        }

    } catch (err) {
        next(err)
    }
}



module.exports = {
    adminAddRepairUser,
    // addRepairUser,
    deleteRepairUser,
    getRepairUser,
    getRepairById,
    getUserData
}