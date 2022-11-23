const mongoose = require("./db")


const schoolShema = mongoose.Schema({
    schoolname:"String",
    schoolid:"String"
})
const schoolModel = mongoose.model("school",schoolShema)
module.exports = schoolModel;