const sms = require('../utils/smsUtil');
const validator = require('validator');
const smsModel = require('../model/smsCode');
const codeModel = require('../model/codeAdded');

async function sendCode(req, res, next) {
    try {
        const {phone} = req.body;
        if (validator.isMobilePhone(phone, 'zh-CN')) { // 判断手机号格式是否正确
            const user = await codeModel.findOne({phone});
            if (!user) {                               //用户不存在时再去发送验证码
                let sixStr = '';
                for (let i = 0; i < 6; i++) {
                    sixStr += Math.floor(Math.random() * 10) + '';
                }
                const smsCode = await sms(phone, sixStr);
                if (smsCode.Code === 'OK') {
                    await smsModel.create({
                        phone,
                        code: sixStr
                    });
                    res.json({code: 200, msg: '短信发送成功'})
                } else {
                    res.json({code: 500, msg: smsCode.Code})
                }
            } else {
                let msg;
                if (user.classification === '管理员'){
                    msg = '该用户已注册管理员';
                    res.json({
                        code: 400,
                        msg
                    })
                }else if (user.classification === '维修员'){
                    msg = '该用户已注册维修员';
                    res.json({
                        code: 400,
                        msg
                    })
                } else {
                    msg = '该学生用户已注册';
                    res.json({
                        code: 400,
                        msg
                    })
                }
            }
        } else {
            res.json({code: 400, msg: '该手机号不是合法的手机号！'})
        }
    } catch(err) {
        next(err)
    }
}


module.exports = {
    sendCode
};
