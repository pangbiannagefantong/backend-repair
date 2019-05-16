const repairDataModel = require('../model/repairData');
const repairUserModel = require('../model/repairUser');
const mongoose = require('mongoose');


//添加报修记录
async function addRepairData(req, res, next) {
    try {
        const user_type = req.user.user_type;
        const userId = req.user.userId;
        if (user_type) {
            const {
                title,
                connect_man,
                dormitory_building,
                address, // 报修地址
                content, // 报修内容
                imgs, // 报修图片
                phone, // 联系人电话
                repair_time, // 方便维修时间
            } = req.body;
            console.log(title);
            const record = await repairDataModel.create({
                title,
                connect_man,
                dormitory_building,
                address, // 报修地址
                content, // 报修内容
                imgs, // 报修图片
                phone, // 联系人电话
                repair_time, // 方便维修时间
                userId: mongoose.Types.ObjectId(userId)
            })
            res.json({
                code: 200,
                msg: '维修记录添加成功',
                data: record
            })
        } else {
            res.json({
                code: 400,
                msg: '请先登录'
            })
        }
    } catch (err) {
        next(err)
    }
}

//学生获取自己所有报修记录
async function studentGetRepairData(req, res, next) {
    try {
        const userId = req.user.userId;
        if (req.body.params) {
            const {pn, size} = req.body.params;
            const data = await repairDataModel.find({userId: userId}).limit(size).skip((pn - 1) * size)
                .sort({_id: -1});
            if (data) {
                res.json({
                    code: 200,
                    data
                })
            } else {
                res.json({
                    code: 400,
                    msg: '还没有添加报修信息，请添加之后再来查看！'
                })
            }
        } else {
            const data = await repairDataModel.find({userId: userId})
                .sort({_id: -1});
            if (data) {
                res.json({
                    code: 200,
                    data
                })
            } else {
                res.json({
                    code: 400,
                    msg: '还没有添加报修信息，请添加之后再来查看！'
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

//学生获取自己报修的已维修订单
async function studentGetDoneRepairData(req, res, next) {
    try {
        const userId = req.user.userId;
        const data = await repairDataModel.find({
            userId: userId,
            status: 3
        }).sort({_id: -1});
        if (data) {
            res.json({
                code: 200,
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '还没有添加报修信息，请添加之后再来查看！'
            })
        }
    } catch (err) {
        next(err)
    }
}

//学生获取自己报修的维修中订单
async function studentGetRepairingData(req, res, next) {
    try {
        const userId = req.user.userId;
        const data = await repairDataModel.find({userId: userId}).sort({_id: -1});
        const repairingData =await data.filter(item => {
            return item.status !== 3
        });
        if (repairingData) {
            res.json({
                code: 200,
                repairingData
            })
        } else {
            res.json({
                code: 400,
                msg: '还没有添加报修信息，请添加之后再来查看！'
            })
        }
    } catch (err) {
        next(err)
    }
}



// ! ！！！后套管理页面获取维修记录  四个情况都用这个！！！
async function getRepairRecord(req, res, next) {
    try {
        let {page = 1, page_size = 10, status} = req.body;
        console.log(status);
        let searchParams = {};
        let sortParams = {_id: -1};
        page = parseInt(page);
        page_size = parseInt(page_size);
        let count = 0;

        if(status) { // 管理员获取指定类型的维修记录
            searchParams = {status};
            count = await repairDataModel.count({status});
        } else { // 管理员获取全部维修记录
            count = await repairDataModel.count()
        }

        let dataList = await repairDataModel.find(searchParams).skip((page - 1) * page_size).limit(page_size)
            .sort(sortParams).populate({path: 'repair_man', select: '-password'});

        res.json({
            code: 200,
            msg: 'success',
            data: dataList,
            count
        })
    } catch (err) {
        next(err)
    }
}


//管理端查看所有报修记录
// async function getAllRepairUser(req, res, next) {
//     try {
//         const user_type = req.user.user_type;
//         if (user_type === 0) {
//             let {page = 1, page_size = 10} = req.query;
//             page = parseInt(page);
//             page_size = parseInt(page_size);
//
//             const dataList = await repairDataModel.find().select("-password")
//                 .limit(page_size).skip((page - 1) * page_size).sort({_id: -1});
//
//             res.json({
//                 code: 200,
//                 data: dataList
//             })
//         } else {
//             res.json({
//                 code: 400,
//                 msg: '获取所有报修信息权限不够，请登录管理员账号查看！'
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// }

// //管理端查看已维修报修记录
// async function getRepairedData(req, res, next) {
//     try {
//         const user_type = req.user.user_type;
//         if (user_type === 0) {
//             let {page = 1, page_size = 10} = req.query;
//             page = parseInt(page);
//             page_size = parseInt(page_size);
//             const dataList = await repairDataModel
//                 .find()
//                 .select("-password")
//                 .limit(page_size)
//                 .skip((page - 1) * page_size)
//                 .sort({_id: -1});
//             const newDataList = dataList.filter((item, index) => {
//                 return item.status === 3
//             })
//             res.json({
//                 code: 200,
//                 data: newDataList
//             })
//         } else {
//             res.json({
//                 code: 400,
//                 msg: '只有管理员能查看所有已完成维修情况哦'
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// }
//
// //管理员查看所有待维修报修记录
// async function getNeedRepairedData(req, res, next) {
//     try {
//         const user_type = req.user.user_type;
//         if (user_type === 0) {
//             let {page = 1, page_size = 10} = req.query;
//             page = parseInt(page);
//             page_size = parseInt(page_size);
//             const dataList = await repairDataModel
//                 .find()
//                 .select("-password")
//                 .limit(page_size)
//                 .skip((page - 1) * page_size)
//                 .sort({_id: -1});
//             const newDataList = dataList.filter((item) => {
//                 return item.status === 1
//             })
//             res.json({
//                 code: 200,
//                 data: newDataList
//             })
//         } else {
//             res.json({
//                 code: 400,
//                 msg: '只有管理员能查看所有已完成维修情况哦'
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// }
//
// //管理员查看所有已派单报修记录
// async function getDispatchedRepairedData(req, res, next) {
//     try {
//         const user_type = req.user.user_type;
//         if (user_type === 0) {
//             let {page = 1, page_size = 10} = req.query;
//             page = parseInt(page);
//             page_size = parseInt(page_size);
//             const dataList = await repairDataModel
//                 .find()
//                 .select("-password")
//                 .limit(page_size)
//                 .skip((page - 1) * page_size)
//                 .sort({_id: -1});
//             const newDataList = dataList.filter((item) => {
//                 return item.status === 2
//             })
//             res.json({
//                 code: 200,
//                 data: newDataList
//             })
//         } else {
//             res.json({
//                 code: 400,
//                 msg: '只有管理员能查看所有已完成维修情况哦'
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// }


//派单   repair_id, repair_user_id
async function dispatchRepair(req, res, next) {
    try {
        const user_type = req.user.user_type;
        if (user_type === 0) {
            const {repair_id, repair_user_id} = req.body;

            let repairRecord = await repairDataModel.findById(repair_id);// 维修记录
            let repairUser = await repairUserModel.findById(repair_user_id); // 维修员

            if (repairRecord && repairUser) {
                if (repairRecord.status === 1) {
                    repairRecord.$set({
                        status: 2,
                        repair_man: repairUser._id
                    })
                    repairRecord.save()
                    res.json({code: 200, msg: '派单成功,该维修记录已经派发到维修员'})
                } else {
                    res.json({
                        code: 400,
                        msg: '维修状态不正确，请重试'
                    })
                }
            } else {
                if (!repairRecord) {
                    res.json({code: 400, msg: '无效的维修记录'})
                }
                if (!repairUser) {
                    res.json({code: 400, msg: '没有找到该维修员'})
                }
            }
        } else {
            res.json({
                code: 400,
                msg: '权限不够，派单失败 ，请登录管理员账号后再试！'
            })
        }
    } catch (err) {
        next(err)
    }
}


//更改维修记录为已维修   id, done_imgList
async function dispatchRepairDone(req, res, next) {
    try {
        const user_type = req.user.user_type;
        const {repair_id, done_imgList} = req.body;
        console.log(repair_id, '1342');
        const repairData = await repairDataModel.findById({_id: mongoose.Types.ObjectId(repair_id)})
        if (repairData) {
            if (user_type === 0) {       //管理员操作
                await repairData.set({status: 3});
                await repairData.save();
                res.json({
                    code: 200,
                    msg: '维修记录修改成功'
                })
            } else if (user_type === 1) {    //维修员操作
                if (repairData.status === 2) {          //判断报修情况，2为已派单
                    await repairData.set({
                        status: 3,
                        completion_time: new Date(),
                        done_imgList
                    });
                    await repairData.save();
                    res.json({
                        code: 200,
                        msg: '维修记录修改成功'
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '请先接单，再确认已维修'
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: '权限不够，无法修改维修信息！'
                })
            }

        } else {
            res.json({
                code: 400,
                msg: '不是有效的维修记录'
            })
        }


    } catch (err) {
        next(err)
    }
}


//维修员获取自己所有的接单
async function repairUserGetData(req, res, next) {
    try {
        const user_type = req.user.user_type;
        const {pn, size} = req.body.params;
        if (user_type === 1) {
            const userId = req.user.userId;
            console.log(userId);
            const data = await repairDataModel.find({
                repair_man: mongoose.Types.ObjectId(userId)
            }).limit(size).skip((pn - 1) * size).sort({_id: -1});
            res.json({
                code: 200,
                data: {
                    data
                }
            })
        } else {
            res.json({
                code: 400,
                msg: "权限不够，请登录维修员账号！"
            })
        }
    } catch (err) {
        next(err)
    }
}

//维修员获取自己已完成订单
async function repairUserGetDoneData(req, res, next) {
    try {
        const user_type = req.user.user_type;
        const userId = req.user.userId;
        console.log(req.body.pn);
        if (user_type === 1) {
            if (req.body.pn) {
                const {pn, size} = req.body;
                const dataList = await repairDataModel.find({repair_man: mongoose.Types.ObjectId(userId)})
                    .limit(size).skip((pn - 1) * size).sort({_id: -1});
                const newDataList = dataList.filter((item) => {
                    return item.status === 3
                });
                res.json({
                    code: 200,
                    data: {
                        newDataList
                    }
                })
            }else {
                const dataList = await repairDataModel.find({repair_man: mongoose.Types.ObjectId(userId)}).sort({_id: -1});
                const newDataList = dataList.filter((item) => {
                    return item.status === 3
                });
                res.json({
                    code: 200,
                    data: {
                        newDataList
                    }
                })
            }
        } else {
            res.json({
                code: 400,
                msg: "权限不够，请登录维修员账号！"
            })
        }
    } catch (err) {
        next(err)
    }
}

//维修员获取已接单待维修订单   pn,size
async function repairUserGetNeedDoneData(req, res, next) {
    try {
        const user_type = req.user.user_type;
        const userId = req.user.userId;
        if (user_type === 1) {
            if (req.body.params) {
                const {pn, size} = req.body.params;
                const dataList = await repairDataModel.find({
                    repair_man: mongoose.Types.ObjectId(userId)
                }).limit(size).skip((pn - 1) * size).sort({_id: -1});
                const newDataList = dataList.filter((item) => {
                    return item.status === 2
                });
                if (newDataList) {
                    res.json({
                        code: 200,
                        data: {
                            newDataList
                        }
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '暂无待维修记录'
                    })
                }

            } else {
                const dataList = await repairDataModel.find({
                    repair_man: mongoose.Types.ObjectId(userId)
                }).sort({_id: -1});
                const newDataList = dataList.filter((item) => {
                    return item.status === 2
                });
                if (newDataList) {
                    res.json({
                        code: 200,
                        data: {
                            newDataList
                        }
                    })
                } else {
                    res.json({code: 400, msg: '暂无待维修记录'})
                }
            }
        } else {
            res.json({code: 400, msg: "权限不够，请登录维修员账号！"})
        }
    } catch (err) {
        next(err)
    }
}

// 根据id获取维修订单详情
async function getRepairDataById(req, res, next) {
    try {
        const user_type = req.user.user_type;
        const id = req.params.id;
        const data = await repairDataModel.findOne({_id: id})
        if (user_type) {
            if (data) {
                res.json({
                    code: 200,
                    data
                })
            } else {
                res.json({
                    code: 400,
                    msg: '找不到该数据'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '请先登录'
            })
        }
    } catch (err) {
        next(err)
    }
}


module.exports = {
    addRepairData,       //添加报修记录
    studentGetRepairData,     //学生获取自己的报修信息
    studentGetDoneRepairData, //学生获取自己报修的已维修订单
    // getAllRepairUser,    //管理端查看所有报修记录
    // getRepairedData,     //管理端查看已维修报修记录
    // getNeedRepairedData, //管理员查看所有待维修报修记录
    // getDispatchedRepairedData, //管理员查看所有已派单报修记录
    dispatchRepair,            //  派单
    dispatchRepairDone,        //更改维修记录为已维修
    repairUserGetData,         //维修员获取自己所有的接单
    repairUserGetDoneData,     //维修员获取自己已完成订单
    repairUserGetNeedDoneData,  //维修员获取已接单待维修订单
    getRepairDataById,          //根据id获取维修订单详情
    studentGetRepairingData,
    getRepairRecord
};
