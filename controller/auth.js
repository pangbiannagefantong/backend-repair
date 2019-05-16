const jwt = require('jsonwebtoken');

// 将token值反编译为data数据
function verifyToken (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'wh', (err, data) => {
            if (err) {
                reject(err);
                return
            }
            resolve(data.data);
            // console.log(data)
        })
    })
}

async function auth(req, res, next) {
    try {
        const {token} = req.headers || req.body || req.query;
        // console.log(token, 'token');
        const userData = await verifyToken(token);
        if (userData) {   //将用户信息存入req.user
            req.user = userData;
            next()
        } else {
            res.json({
                code: 401,
                msg: '登陆状态已失效，请重新登陆'
            })
        }
    } catch (err) {
        res.json({
            code: 401,
            msg: 'token已失效，请重新登陆'
        })
    }
}

module.exports = auth;
