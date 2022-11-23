const router = require("express").Router();
const axios = require("axios")

const multer = require("multer");

const path = require('path')
const fs = require('fs');

const toGetOpenid = async function (userCode) {
    return await axios({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx1c4f2b802f9f9ffd&secret=453be5dc84125119c658dcf0e44c519c&js_code=${userCode}&grant_type=authorization_code`,
        method: "post",
        data: {
            code: userCode
        }
    })
}

router.post("/getOpenid", async (req, res) => {
    const { userCode } = req.body;
    try {
        let { data } = await toGetOpenid(userCode);
        res.send(data)
    } catch (err) {
        return err
    }
})

const upload = multer({ dest: "tmp/" })
router.post("/upload", upload.single("file"), (req, res) => {
    let imgFile = req.file;//获取图片上传的资源
    // console.log(imgFile)
    let tmp = imgFile.path;//获取临时资源
    let ext = path.extname(imgFile.originalname);//利用path模块获取 用户上传图片的 后缀名
    let newName = "" + (new Date().getTime()) + Math.round(Math.random() * 10000) + ext;  //给用户上传的图片重新命名 防止重名
    let newPath = "../../public/imgs/" + newName; //给图片设置存放目录  提前给当前文件夹下建立一个   images文件夹  ！！！！
    let fileData = fs.readFileSync(tmp);//将上传到服务器上的临时资源 读取到 一个变量里面
    fs.writeFileSync(path.join(__dirname, newPath), fileData);//重新书写图片文件  写入到指定的文件夹下
    // console.log('http://localhost:3060/util/getImg?picUrl=public/imgs/' + newName)
    let newurl = 'https://zsm.kknbb.cc:3090/util/getImg?picUrl=public/imgs/' + newName;
    res.send(newurl);//上传成功之后  给客户端响应
})


router.get('/getImg', (req, res) => {
    let { picUrl } = req.query
    // console.log(picUrl)
    res.sendFile(path.resolve(`./${picUrl}`))
})


router.get('/removeImg', function (req, res) {
    let { picUrl } = req.query
    fsPromises.unlink(`./${picUrl}`)
    res.send('ok')
})

module.exports = router