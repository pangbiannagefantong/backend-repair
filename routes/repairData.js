const {Router} = require('express');
const router = Router();
const auth = require('../controller/auth');
const {addRepairData,repairUserGetData,repairUserGetDoneData,
    // getAllRepairUser,
    // getNeedRepairedData,getDispatchedRepairedData, , getRepairedData,
    dispatchRepair,repairUserGetNeedDoneData,studentGetRepairingData,
    dispatchRepairDone, studentGetRepairData, getRepairDataById, studentGetDoneRepairData, getRepairRecord} = require('../controller/repairData');



router.get('/studentGetRepairingData', auth, studentGetRepairingData);
// title, connect_man,  category, 分类  address,报修地址  phone， content,报修内容  必填
// teach_building, dormitory_building,  repair_time,方便维修时间
//  imgs,报修图片    department,院系

//添加报修信息        token需要任意用户登录后报修
router.post('/addRepair', auth, addRepairData);

//学生获取自己的报修信息   token
router.post('/studentGetRepairData', auth, studentGetRepairData);

//学生获取自己报修的已维修订单
router.get('/studentGetDoneRepairData', auth, studentGetDoneRepairData);

//管理员获取所有报修信息    token 管理员权限
// router.get('/', auth, getAllRepairUser);

// //管理员获取所有已维修的报修情况    token 管理员权限
// router.get('/repaired', auth, getRepairedData);
//
// //管理员获取所有已派单报修信息      token 管理员权限
// router.get('/dispatched', auth, getDispatchedRepairedData);
//
// //管理员获取所有待维修报修信息      token 管理员权限
// router.get('/needed', auth, getNeedRepairedData);

//派单 repair_id, repair_user_id    token 管理员权限
router.post('/', auth, dispatchRepair);

//更改维修记录为已维修  id, done_imgList  token
router.post('/dispatchRepairDone', auth, dispatchRepairDone);

//维修员获取自己所有的接单
router.post('/repairUserGetData', auth, repairUserGetData);

//维修员获取自己已完成订单
router.post('/repairUserGetDoneData', auth, repairUserGetDoneData);

//维修员获取已接单待维修订单   pn, size
router.post('/repairUserGetNeedDoneData', auth, repairUserGetNeedDoneData);

//根据id获取维修订单详情
router.get('/getRepairDataById:id', auth, getRepairDataById);


router.post('/getRepairRecord', auth, getRepairRecord)

module.exports = router;
