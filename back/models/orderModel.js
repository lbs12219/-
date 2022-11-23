const mongoose = require("./db")


const orderShema = mongoose.Schema({
    successtime: String,//完成时间
    rank: Array,//编号
    util: String, //备注信息
    createtime: String,//创建时间
    info: Object,//菜品信息
    presuccesstime: String,//预计现在还需要多久
    state: Number,//状态(-1表示已完成但是等待购买,0表示待做,1表示已完成,2表示有疑问/失败)
    openid: String,
})
const orderModel = mongoose.model("order", orderShema)
module.exports = orderModel;