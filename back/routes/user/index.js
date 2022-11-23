const router = require("express").Router();
const {
  userModel,
  merchantModel,
  mealModel,
  orderModel,
  schoolModel,
} = require("../../models");
const ORDERNUMBER = require("../util/ORDERNUMBER");
const merchant = new ORDERNUMBER();
router.post("/selectStuId", async (req, res) => {
  const { stuOpenid } = req.body;
  try {
    let result = await userModel.find({ openid: stuOpenid });
    // console.log(result);
    if (result.length != 0) {
      res.send(result);
      return;
    } else {
      res.send(false);
      return;
    }
  } catch (err) {
    return err;
  }
});

router.post("/addStu", async (req, res) => {
  const { stuSchool, stuOpenid } = req.body;
  try {
    if (stuSchool && stuOpenid) {
      const newStudent = new userModel({
        openid: stuOpenid,
        school: stuSchool,
        token: "666",
      });
      newStudent.save();
      res.send(true);
    } else {
      res.send("传值了吗,就调用接口?");
    }
  } catch (err) {
    return err;
  }
});
router.post("/changeStu", async (req, res) => {
  const { stuSchool, mongoId } = req.body;
  try {
    let { acknowledged } = await userModel.updateOne(
      { _id: mongoId },
      {
        school: stuSchool,
      }
    );
    if (acknowledged) {
      res.send(true);
      return;
    } else {
      res.send(false);
    }
  } catch (err) {
    return err;
  }
});

router.post("/selectShopId", async (req, res) => {
  const { selectStuId } = req.body;
  let result = await merchantModel.find({ openid: selectStuId });
  if (result.length != 0) {
    res.send(result);
  } else {
    res.send(false);
  }
});
router.post("/addShop", async (req, res) => {
  //此接口不存图片
  const { shopPerson, shopName, shopLocatin, schoolId, shoppOpenid, fileUrl } =
    req.body;
  if (
    shopPerson &&
    shopName &&
    shopLocatin &&
    schoolId &&
    shoppOpenid &&
    fileUrl
  ) {
    try {
      const newMerchant = new merchantModel({
        shopperson: shopPerson,
        shopname: shopName,
        shoplocatin: shopLocatin,
        schoolid: schoolId,
        openid: shoppOpenid,
        filelist: fileUrl,
      });
      let result = await newMerchant.save();
      res.send(result);
    } catch (err) {
      return err;
    }
  } else {
    res.send("传值了吗,就调用接口?");
  }
});
router.post("/selectSchool", async (req, res) => {
  const { schoolId } = req.body;
  let result = await userModel.find({ schoolid: schoolId });
  if (result.length != 0) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post("/addMeal", async (req, res) => {
  const {
    mealName,
    mealClassify,
    mealInfo,
    waitTime,
    fileList,
    shoppOpenid,
    mealPrice,
  } = req.body;
  try {
    if (
      mealName &&
      mealClassify &&
      mealInfo &&
      waitTime &&
      fileList &&
      shoppOpenid &&
      mealPrice
    ) {
      const newMeal = new mealModel({
        name: mealName,
        classify: mealClassify,
        mealinfo: mealInfo,
        waitTime,
        fileList,
        shoppOpenid,
        price: mealPrice,
      });
      newMeal.save();
      res.send(true);
    } else {
      res.send("传值了吗,就调用接口?");
    }
  } catch (err) {
    return err;
  }
});
router.post("/delMeal", async (req, res) => {
  const { id } = req.body;
  try {
    let { acknowledged } = await mealModel.deleteOne({ _id: id });
    if (acknowledged === true) {
      res.send(true);
      return;
    } else {
      return;
    }
  } catch (err) {
    return err;
  }
});

router.post("/getAllMeal", async (req, res) => {
  const { shoppOpenid } = req.body;
  let result = await mealModel.find({ shoppOpenid });
  res.send(result);
});

router.post("/getAllShop", async (req, res) => {
  const { schoolId } = req.body;
  let result = await merchantModel.find({ schoolid: schoolId });
  res.send(result);
});
router.post("/getReadyMeal", async (req, res) => {
  var openid = req.body["openid"];
  let result = await orderModel.find({ state: -1, openid });
  res.send(result);
});
router.post("/getMadeMeal", async (req, res) => {
  var openid = req.body["openid"];
  var time = req.body["time"];
  let result = await orderModel.find({ state: 0, openid });
  // let result = await orderModel.find({ state: 0, openid }).sort({ rank: 1 });
  // if (result.length != 0) {
  //   let firstTime = Number(result[0].createtime) + Number(result[0].info[0]["waitTime"]) - Number(time);
  //   result[0].presuccesstime = firstTime >= 0 ? firstTime : 0
  //   for (let i = 1; i <= result.length; i++) {
  //     if (result[i - 1].presuccesstime == 0 && result[i]) {
  //       let allWaitTime = 0
  //       for(let j = 0; j <= i; j++){
  //         allWaitTime += +result[j].info[0]["waitTime"]
  //       }
  //       let tem = Number(result[0].createtime) + Number(allWaitTime) - Number(time)
  //       // let tem = Number(result[i].createtime) + Number(result[i].info[0]["waitTime"]) - Number(time)
  //       result[i].presuccesstime = tem >= 0 ? tem : 0;
  //       continue;
  //     }
  //     if (result[i]) {
  //       result[i].presuccesstime = Number(result[i - 1].presuccesstime) + Number(result[i].info[0]["waitTime"]);
  //     }
  //   }
  // }
  res.send(result)
});
router.post("/getHasSold", async (req, res) => {
  const { openid } = req.body;
  let result = await orderModel.find({ openid, state: 1 });
  res.send(result);
});

router.post("/addReadyMeal", async (req, res) => {
  // 前端需要发和菜品id给我
  const { openid, mongodbId } = req.body;
  try {
    let rank = merchant.order(openid);
    let mealInfo = await mealModel.find({ _id: mongodbId });
    const newOrder = new orderModel({
      successtime: "",
      rank: [rank],
      util: "现成餐食",
      createtime: new Date().toLocaleTimeString(),
      state: -1,
      openid,
      info: mealInfo,
    });
    newOrder.save();
    res.send(true);
  } catch (err) {
    return err;
  }
});
router.post("/addMadeMeal", async (req, res) => {
  // 前端需要发备注和菜品id给我
  const { openid, mongodbId } = req.body;
  try {
    let madeMealList = await orderModel.find({ state: 0, openid });
    let mealInfo = await mealModel.find({ _id: mongodbId });
    // console.log("现做餐食",madeMealList)
    // console.log("餐食信息",mealInfo)
    let rank = merchant.order(openid);
    let temCreatetime = new Date().getTime()
    if (madeMealList.length == 0) {
      var temSuccesstime = +temCreatetime + +mealInfo[0].waitTime
    } else {
      if (+temCreatetime > +madeMealList[madeMealList.length - 1].successtime) {
        var temSuccesstime = +temCreatetime + +mealInfo[0].waitTime
      } else {
        var temSuccesstime = +madeMealList[madeMealList.length - 1].successtime + +mealInfo[0].waitTime
      }
    }
    // console.log("结束时间",temSuccesstime)
    const newOrder = new orderModel({
      successtime: temSuccesstime,
      rank: [rank],
      openid,
      util: "现做餐食",
      createtime: temCreatetime,
      state: 0,
      info: mealInfo,
    });
    newOrder.save();
    res.send(true);
  } catch (err) {
    return err;
  }
});
router.post("/orderComplete", async (req, res) => {
  const { openid, rank } = req.body;
  try {
    let resulut = await orderModel.findOneAndUpdate(
      { openid, rank },
      { state: 1 }
    );
    // console.log(resulut);
    res.send(true);
  } catch (err) {
    return err;
  }
});
router.post("/changeShop", async (req, res) => {
  const { shoppOpenid, shopPerson, shopName, shopLocatin, fileUrl } = req.body;
  let result = await merchantModel.find({ openid: shoppOpenid });
  if (result.length === 1) {
    let { acknowledged } = await merchantModel.updateOne(result[0], {
      shopperson: shopPerson,
      shopname: shopName,
      shoplocatin: shopLocatin,
      filelist: fileUrl,
    });
    res.send(acknowledged);
  }
});
router.post("/checkSchoolId", async (req, res) => {
  let { schoolId } = req.body;
  let result = await schoolModel.find({ schoolid: schoolId });
  if (result.length != 0) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/getAllSchools", async (req, res) => {
  let result = await schoolModel.find({});
  res.send(result);
});

router.post('/joinOrder', async (req, res) => {
  const { openid, rank1, rank2, mongoId, rankArr, wT } = req.body;
  try {
    let result = await orderModel.findOneAndUpdate(
      { openid, rank: rank1 },
      { rank: [...rank1, ...rank2] }
    );
    await orderModel.findOneAndDelete({ _id: mongoId })
    for (let i = 0; i < rankArr.length; i++) {
      let res1 = await orderModel.find({ openid, rank: rankArr[i] })
      let res2 = await orderModel.findOneAndUpdate(
        { openid, rank: rankArr[i] },
        { successtime: +res1[0].successtime - +wT }
      )
    }
    res.send(true);
  } catch (err) {
    return err;
  }
})

router.post('/eatOut', async (req, res) => {
  const { openid, rank, rankArr, wT } = req.body;
  try {
    let result = await orderModel.findOneAndUpdate(
      { openid, rank },
      { successtime: new Date().getTime() }
    );
    for (let i = 0; i < rankArr.length; i++) {
      let res1 = await orderModel.find({ openid, rank: rankArr[i] })
      let nowST = new Date().getTime()
      let res2 = await orderModel.findOneAndUpdate(
        { openid, rank: rankArr[i] },
        { successtime: +res1[0].successtime - +wT }
      )
    }
    res.send(true);
  } catch (err) {
    return err;
  }
})

module.exports = router;
