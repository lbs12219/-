<template>
  <view>
    <van-field clearable label="菜品名称" placeholder="请输入菜品名称" :value="mealName" maxlength=10 required
      @change="getMealName" />
    <van-field clearable label="菜品分类" placeholder="请输入菜品分类" :value="mealClassify" maxlength=10 required
      @change="getMealClassify" />
    <van-field clearable label="菜品简介" placeholder="请输入菜品简介" :value="mealInfo" maxlength=20 type="textarea" required
      @change="getMealInfo" />
    <van-field clearable label="菜品价格" type="digit" placeholder="请输入菜品价格" :value="mealPrice" required
      @change="getMealPrice" />
    <van-field clearable label="等待时间(分钟)" type="digit" placeholder="请估计等待时长(分钟)" :value="waitTime" required
      @change="getWaitTime" />
    <view class="photo-box">
      <view class="photo-text">
        请上传菜品图片（限一张，非必须）
      </view>
      <view class="loadPhoto-box">
        <van-uploader :file-list="fileList" deletable="true" max-count="1" show-upload @delete="delMealPhoto"
          @after-read="loadMealPhoto" image-fit="aspectFit"></van-uploader>
        <!-- <van-button icon="photo" type="primary"></van-button> -->
      </view>
    </view>
    <view class="stu-login-sumbit">
      <button @click="sumbitSchool" type="primary" :loading="btnLoad" plain="true">新增</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        // fileName: "",
        mealName: "",
        mealClassify: "",
        mealInfo: "",
        mealPrice: "",
        waitTime: "",
        contactErr: "",
        user: {}
      };
    },
    methods: {
      getMealName(e) {
        // console.log(e.detail)
        this.mealName = e.detail
      },
      getMealClassify(e) {
        this.mealClassify = e.detail
      },
      getMealInfo(e) {
        this.mealInfo = e.detail
      },
      getMealPrice(e) {
        this.mealPrice = e.detail
      },
      getWaitTime(e) {
        this.waitTime = e.detail
      },
      loadMealPhoto(e) {
        this.fileList = [{
          url: e.detail.file.url
        }]
        // this.fileName = new Date().getTime() + '.png'
      },
      delMealPhoto(e) {
        this.fileList = []
      },
      // 上传菜品图片到服务器
      uploadMealPhoto() {
        uni.uploadFile({
          url: 'https://zsm.kknbb.cc:3090/util/upload',
          filePath: this.fileList[0].url,
          name: "file",
          success: (res) => {
            this.fileList[0].url = res.data
            // console.log(res.data);
            this.uploadInfo()
          }
        });
      },
      uploadInfo() {
        let msTime = this.exchangeTimeStamp(this.waitTime)
        uni.$http.post('/user/addMeal', {
          mealName: this.mealName,
          mealClassify: this.mealClassify,
          mealInfo: this.mealInfo,
          mealPrice: this.mealPrice,
          waitTime: msTime,
          fileList: this.fileList[0].url,
          shoppOpenid: this.user.userOpenid
        }).then((res) => {
          uni.$showPro('新增成功')
          // console.log(this.mealName)
          this.mealName = ""
          this.mealClassify = ""
          this.mealInfo = ""
          this.mealPrice = ""
          this.waitTime = ""
          this.fileList = []
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 上传信息
      addInfo() {
        // console.log(this.fileList)
        if (this.fileList.length == 0) {
          this.fileList = [{
            url: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
          }]
          this.uploadInfo()
        } else {
          this.uploadMealPhoto()
        }
      },
      // 判断是否为空
      judgeKong() {
        let tem = [this.mealName, this.mealClassify, this.mealInfo, this.mealPrice, this.waitTime]
        let i = 0
        for (const item of tem) {
          i++
          if (item == '') return i
        }
      },
      sumbitSchool() {
        // console.log("lll", this.judgeKong())
        switch (this.judgeKong()) {
          case 1:
            uni.$showPro("请填写菜品名称")
            return;
          case 2:
            uni.$showPro("请填写菜品分类")
            return;
          case 3:
            uni.$showPro("请填写菜品简介")
            return;
          case 4:
            uni.$showPro("请填写菜品价格")
            return;
          case 5:
            uni.$showPro("请填写等待时间")
            return;
          default:
            break
        }
        this.addInfo()
      },
      // 将等待时间转换成时间戳
      exchangeTimeStamp(time) {
        return 60000 * time
      },
      initShopInfo() {
        this.user = uni.getStorageSync('user')
        // console.log(this.user)
      }
    },
    onLoad() {
      this.initShopInfo()
    }
  }
</script>

<style lang="scss">
  .photo-box {
    margin-top: 10px;
    margin-left: 8px;

    .photo-text {
      margin-bottom: 10rpx;
      font-size: 15px;
      color: gray;
    }

    .loadPhoto-box {
      margin-left: 8px;
    }
  }

  .divider {
    background: #E0E3DA;
    width: 100%;
    height: 5rpx
  }

  .stu-login-sumbit {
    width: 60%;
    margin: 0 auto;
    margin-top: 40rpx;
  }
</style>
