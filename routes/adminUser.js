const {Router} = require('express');
const router = Router();
const auth = require('../controller/auth');
const {addAdmin, getAdmin, deleteAdminUser} = require('../controller/adminUser');

// 添加管理员
router.post('/addAdmin', addAdmin);  //phone, code, avatar, nickName, password, job, sex

//获取所有管理员信息
router.get('/getAdmin',auth, getAdmin);

//删除管理员   id  token
router.delete('/:id' ,auth, deleteAdminUser);

module.exports = router;
