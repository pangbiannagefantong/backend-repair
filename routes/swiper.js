const {Router} = require('express');
const router = Router();
const {addSwiper, getSwiper,} =require('../controller/swiper')


router.post('/', addSwiper);
router.get('/', getSwiper);


module.exports = router;
