const mongoose = require("./db")


const mealShema = mongoose.Schema({
    name:"String",
    classify:"String",
    mealinfo:"String",
    waitTime:"String",
    fileList:"String",//fileName在每一项的对象里
    shoppOpenid:"String",//
    belong:"String", //属于的窗口,现在貌似不需要了
    price:"String",
})
const mealModel = mongoose.model("meal",mealShema)
module.exports = mealModel;