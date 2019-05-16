const {Router} = require('express');
const router = Router();
const {adminLogin, repairLogin, studentLogin} = require('../controller/login');

router.post('/admin', adminLogin);
router.post('/repair', repairLogin);
router.post('/student', studentLogin);


module.exports = router;
