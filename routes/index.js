var express = require('express');
var router = express.Router();
const adminUserRouter = require('./adminUser');
const smsCodeRouter = require('./smsCode');
const fixUserModel = require('./repairUser');
const repairModel = require('./repairData');
const studentsUserModel = require('./studentUser');
const loginModel = require('./login');
const changeUserModel = require('./changeUser');
const swiperModel = require('./swiper');


router.use('/admin', adminUserRouter);
router.use('/smsCode', smsCodeRouter);
router.use('/repairUser', fixUserModel);
router.use('/repair', repairModel);
router.use('/student', studentsUserModel);
router.use('/login', loginModel);
router.use('/changeUser', changeUserModel);
router.use('/swiper', swiperModel);


module.exports = router;
