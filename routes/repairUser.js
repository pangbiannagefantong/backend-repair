const {Router} = require('express');
const router = Router();
const auth = require('../controller/auth');
const {adminAddRepairUser, deleteRepairUser, getRepairUser, getRepairById ,getUserData} = require('../controller/repairUser');

router.post('/adminAdd', auth, adminAddRepairUser); //admin添加维修员账号 phone, password, nickName, sex, job
// router.post('/', addRepairUser);   //用户申请注册维修员账号  phone, code, password, nickName, sex, job
router.delete('/:id' ,auth, deleteRepairUser);  //删除维修员账号     id，token
router.get('/', auth, getRepairUser);     //获取所有维修员信息     token
router.get('/:id', getRepairById);    //根据id获取维修员信息   id
router.post('/getUser', auth, getUserData);   //获取用户信息

module.exports = router;