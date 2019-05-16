const studentUserModel = require('../model/studentUser');
const validator = require('validator');
const smsModel = require('../model/smsCode');
const codeModel = require('../model/codeAdded');
const mongoose = require('mongoose');

//学生用户注册   phone, code，password
async function addStudentUser(req, res, next) {
    try {
        const {phone, code, password} = req.body;
        const phoneStatus = validator.isMobilePhone(phone, 'zh-CN');
        if (phoneStatus) {
            const data = await studentUserModel.findOne({phone});
            if (data) {
                res.json({
                    code: 400,
                    msg: '该用户已注册'
                })
            } else {
                const phoneCode = await smsModel.findOne({phone}).sort({_id: -1});
                if (phoneCode) { //判断是否发送过验证码
                    // console.log(phoneCode.code,'phone')
                    let smsCodeData = new Date(phoneCode.updateTime);
                    let smsCodeTime = Math.round(smsCodeData.getTime() / 1000);
                    let nowTime = Math.round(Date.now()/1000);
                    console.log(phoneCode.updateTime,'time');
                    if ((nowTime - smsCodeTime) < 60 * 5) {     //判断验证码是否在有效期
                        if (code === phoneCode.code) {   //验证码是否正确
                            await studentUserModel.create({phone, code, password});
                            await codeModel.create({
                                phone, password,
                                classification: '学生用户'
                            });     //数据库中存入已创建账号
                            await
                                res.json({
                                    code: 200,
                                    msg: '学生用户注册成功'
                                })
                        } else {
                            res.json({code: 400, msg: '验证码不正确'})
                        }
                    } else {               //验证码已过期
                        res.json({code: 400, msg: '验证码已过期'})
                    }
                } else {
                    res.json({code:400, msg: '请先发送验证码'})
                }
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

//获取学生用户信息   token
async function getStudentUser(req, res, next)  {
    try {
        const userId = req.user.userId;
        const data = await studentUserModel.findOne({
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
                msg: '无法找到此人'
            })
        }
    } catch (err) {
        next (err)
    }
}

module.exports = {
    addStudentUser,
    getStudentUser
}
