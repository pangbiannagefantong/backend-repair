const {Router} = require('express');
const router = Router();
const auth = require('../controller/auth');
const {changeUserAvatar, changeUserNickName, changeUserPassword} = require('../controller/changeUser');

//修改用户头像   avatar   token
router.post('/avatar', auth, changeUserAvatar);

//修改用户昵称   nickName  token
router.post('/nickName', auth, changeUserNickName);

//修改用户密码  password, changePassword  token
router.post('/password', auth, changeUserPassword);

module.exports = router;
