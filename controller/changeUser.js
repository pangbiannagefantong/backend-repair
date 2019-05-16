const adminUserModel = require('../model/adminUser');
const repairUserModel = require('../model/repairUser');
const studentUserModel = require('../model/studentUser');
const mongoose = require('mongoose');


//更改用户头像    avatar, token
async function changeUserAvatar(req, res, next) {
    try {
        const userId = req.user.userId;
        const {avatar} = req.body;
        console.log(userId);
        const adminUser = await adminUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        const repairUser = await repairUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        const studentUser = await studentUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        if (adminUser) {
            await adminUser.set({avatar});
            await adminUser.save();
            res.json({code: 200, msg: '管理员头像修改成功'})
        } else if (repairUser) {
            await repairUser.set({avatar});
            await repairUser.save();
            res.json({code: 200, msg: '维修员头像修改成功'})
        } else if (studentUser) {
            await studentUser.set({avatar});
            await studentUser.save();
            res.json({code: 200, msg: '学生头像修改成功'})
        } else {
            res.json({code: 400, msg: '无法找到此人'})
        }
    } catch (err) {
        next(err)
    }
}

//更改用户昵称   nickName  token
async function changeUserNickName(req, res, next) {
    try {
        const userId = req.user.userId;
        const {nickName} = req.body;
        console.log(nickName);
        const adminUser = await adminUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        const repairUser = await repairUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        const studentUser = await studentUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        if (adminUser) {
            await adminUser.set({nickName});
            await adminUser.save();
            res.json({code: 200, msg: '管理员昵称修改成功'})
        } else if (repairUser) {
            await repairUser.set({nickName});
            await repairUser.save();
            res.json({code: 200, msg: '维修员昵称修改成功'})
        } else if (studentUser) {
            await studentUser.set({nickName});
            await studentUser.save();
            res.json({code: 200, msg: '学生昵称修改成功'})
        } else {
            res.json({code: 400, msg: '无法找到此人'})
        }
    } catch (err) {
        next(err)
    }
}

//更改用户密码  password, changePassword
async function changeUserPassword (req, res, next) {
    try {
        const {userId} = req.user;
        const {password, changePassword} = req.body;
        const adminUser = await adminUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        const repairUser = await repairUserModel.findById({_id:mongoose.Types.ObjectId(userId)});
        const studentUser = await studentUserModel.findById({_id:mongoose.Types.ObjectId(userId)});

        if (password === changePassword) {
            res.json({
                code: 400,
                msg: '新密码与原密码相同，请重新输入！'
            })
        } else  {
            if (adminUser) {
                if (adminUser.password === password) {
                    if (adminUser.password === changePassword) {
                        res.json({
                            code: 400,
                            msg: '修改后密码与原密码相同，请重新输入！'
                        })
                    } else {
                        await adminUser.set({
                            password: changePassword
                        });
                        await adminUser.save();
                        res.json({code: 200, msg: '管理员密码修改成功'})
                    }
                } else {
                    res.json({code: 400, msg: '原密码不正确！'})
                }
            } else if (repairUser) {
                if (repairUser.password === password) {
                    if (repairUser.password === changePassword) {
                        res.json({
                            code: 400,
                            msg: '修改后密码与原密码相同，请重新输入！'
                        })
                    } else {
                        await repairUser.set({
                            password: changePassword
                        });
                        await repairUser.save();
                        res.json({code: 200, msg: '维修员密码修改成功'})
                    }
                } else {
                    res.json({code: 400, msg: '原密码不正确！'})
                }
            } else if(studentUser) {
                if (studentUser.password === password) {
                    if (studentUser.password === changePassword) {
                        res.json({
                            code: 400,
                            msg: '修改后密码与原密码相同，请重新输入！'
                        })
                    } else {
                        await studentUser.set({password: changePassword});
                        await studentUser.save();
                        res.json({code: 200, msg: '学生密码修改成功'})
                    }
                } else {
                    res.json({code: 400, msg: '原密码不正确！'})
                }
            } else {
                res.json({code: 400, msg: '找不到该用户'})
            }
        }
    } catch(err) {
        next(err)
    }
}



module.exports = {
    changeUserAvatar,
    changeUserNickName,
    changeUserPassword
}
