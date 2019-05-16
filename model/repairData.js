const mongoose = require('mongoose');

const repairData = new mongoose.Schema({
    title: {        // 维修标题
        type: String,
        required: true
    },
    phone: {             // 联系人电话
        type: String,
        required:true
    },
    connect_man: {       // 联系人名字
        type: String,
        required: true
    },
    content: {            // 报修内容
        type: String,
        required: true
    },
    address: {            // 详细地址
        type: String,
    },
    department: {
        type: String
    },
    userId: String,   //报修人id
    name: {              // 报修人
        type: String,
        default: ''
    },
    teach_building: String,       // 教学楼
    dormitory_building: String,   // 宿舍楼
    imgs: [{                // 报修图片
        type: String
    }],
    repair_time: String,     // 方便维修时间

    repair_man: {            // 派单维修员
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'repairUser'
    },
    status: {
        type: Number,
        default: 1
        // 1 待派单
        // 2 维修中（已派单）
        // 3 已维修
    },

    start: Number,     // 评价
    completion_time: {
        type: Date
    },
    done_imgList: [
        {
            type: String
        }
    ]
}, {versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('repairData', repairData);