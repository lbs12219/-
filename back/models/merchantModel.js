
const mongoose = require("./db");

const merchantShema = mongoose.Schema({
    shopperson:"String",//商家负责人名称
    shopname:"String",
    shoplocatin:"String",
    schoolid:"String",
    filelist:"String",//filename在每一个数组的对象里面
    openid:"String"
});
const merchantModel = mongoose.model("merchant", merchantShema);
module.exports = merchantModel;
