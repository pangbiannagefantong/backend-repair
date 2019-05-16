const {Router} = require('express');
const router = Router();
const {sendCode} = require('../controller/smsCode');

router.post('/', sendCode);   //phone


module.exports = router;
