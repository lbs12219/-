const mongoose = require("./db")


const userShema = mongoose.Schema({
    openid:"String",
    token:"String",
    school:"String", //传学校名称
    username:"String",
})
const userModel = mongoose.model("user",userShema)
module.exports = userModel;