
const adminModel = require("./admin");
const merchantModel = require("./merchantModel");
const userModel = require("./userModel");
const mealModel = require("./mealModel")
const schoolModel = require("./schoolModel")
const orderModel = require("./orderModel")
//商家表merchantModel
//用户表userModel
//管理员表adminModel
//商品表mealModel
//学校表schoolModel
//订单表orderModel




module.exports = {
    userModel,
    merchantModel,
    adminModel,
    mealModel,
    schoolModel,
    orderModel
}