const {Router} = require('express');
const router = Router();
const auth = require('../controller/auth')
const {addStudentUser, getStudentUser} = require('../controller/studentUser');

//学生注册  phone, code, password
router.post('/register', addStudentUser);

//获取学生信息   token
router.get('/getStudentUser', auth, getStudentUser);

module.exports = router;

