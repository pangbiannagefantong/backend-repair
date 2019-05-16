const adminUserModel = require('../model/adminUser');
const repairUserModel = require('../model/repairUser');
const studentUserModel = require('../model/studentUser');
const signUtil = require('../utils/signToken');

//管理员登陆   phone, password
async function adminLogin(req, res, next) {
    try {
        const {phone, password} = req.body;
        if (phone && password) {
            const adminUser = await adminUserModel.findOne({phone});
            if (adminUser) {
                if (adminUser.password === password) {
                    const adminToken = signUtil({userId: adminUser._id, user_type: 0});
                    res.json({
                        code: 200,
                        data: {
                            adminUser,
                            adminToken
                        },
                        abc: 'admin',
                        msg: '登陆成功'
                    })
                } else {
                    res.json({code: 400, msg: '管理员密码不正确！'})
                }
            } else {
                res.json({code: 400, msg: '该用户不存在'})
            }
        } else {
            res.json({
                code: 400,
                msg: '手机号或密码格式不正确，请重新输入！'
            })
        }
    } catch (err) {
        next(err)
    }
}

//维修员登陆  phone, password
async function repairLogin(req, res, next) {
    try {
        const {phone, password} = req.body;
        if (phone && password) {
            const repairUser = await repairUserModel.findOne({phone});
            if (repairUser) {
                if (repairUser.password === password) {
                    const repairToken = signUtil({userId: repairUser._id, user_type: 1});
                    res.json({
                        code: 200,
                        data: {
                            repairUser,
                            repairToken
                        },
                        abc: 'repair',
                        msg: '登陆成功'
                    })
                } else {
                    res.json({code: 400, msg: '维修员密码不正确'})
                }
            } else {
                res.json({code: 400, msg: '该用户不存在'})
            }
        } else {
            res.json({
                code: 400,
                msg: '手机号或密码格式不正确，请重新输入！'
            })
        }


    } catch(err) {
        next (err)
    }
}


//学生登陆   phone, password
async function studentLogin(req, res, next) {
    try {
        const {phone, password} = req.body;
        if (phone && password) {
            const studentUser = await studentUserModel.findOne({phone});
            if (studentUser) {
                if (studentUser.password === password) {
                    const studentToken = signUtil({userId: studentUser._id, user_type: 2})
                    res.json({
                        code: 200,
                        data: {
                            studentUser,
                            studentToken
                        },
                        abc: 'student',
                        msg: '登陆成功'
                    })
                } else {
                    res.json({code: 400, msg: '用户密码不正确！'})
                }
            } else {
                res.json({code: 400, msg: '该用户不存在'})
            }
        } else {
            res.json({
                code: 400,
                msg: '手机号或密码格式不正确，请重新输入！'
            })
        }


    }catch(err) {
        next (err)
    }
}


module.exports = {
    adminLogin,
    repairLogin,
    studentLogin
}
