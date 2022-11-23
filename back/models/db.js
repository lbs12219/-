const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1/hole";

mongoose.connect(url);

module.exports = mongoose;
