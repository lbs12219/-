const mongoose = require("./db")


const adminShema = mongoose.Schema({

})
const adminModel = mongoose.model("admin",adminShema)
module.exports = adminModel;