const router = require("express").Router();
const user = require("./user")
const admin = require("./admin")
const util = require("./util")
router.use("/user",user)
router.use("/admin",admin)
router.use("/util",util)

module.exports = router;