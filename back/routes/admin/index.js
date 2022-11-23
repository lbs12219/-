const router = require("express").Router();
const { schoolModel } = require("../../models/index");
router.post("/addSchool", async (req, res) => {
  try {
    let { schoolname, schoolid } = req.body;
    const result = await new schoolModel({
      schoolname,
      schoolid,
    }).save();
    res.send(result);
  } catch (err) {
    return err;
  }
});
module.exports = router;
