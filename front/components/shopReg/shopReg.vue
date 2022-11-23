<template>
  <view class="shop-login-box">
    <view class="divider" />
    <view class="shop-login-item">
      <van-field clearable label="负责人姓名" placeholder="请输入负责人姓名" :value="shopPerson" maxlength=5 required
        @change="getShopPerson" />
      <van-field clearable label="商铺名称" placeholder="请输入商铺名称" :value="shopName" maxlength=10 required
        @change="getShopName" />
      <van-field clearable label="班组号" placeholder="请输入班组号" :value="shopLocatin" maxlength=10 required
        @change="getShopLocatin" />
      <van-field :disabled="shopRegBtn ? true : false" clearable label="学校申请ID" placeholder="请输入学校发放的专属ID"
        :value="schoolId" required @change="getSchoolId" />
    </view>
    <view class="photo-box">
      <view class="photo-text">
        <text class="after-text">*</text>请上传商铺照片（限一张）
      </view>
      <view class="loadPhoto-box">
        <van-uploader :file-list="fileList" deletable="true" max-count="1" show-upload @delete="delPhoto"
          @after-read="loadPhoto" image-fit="aspectFit"></van-uploader>
        <!-- <van-button icon="photo" type="primary"></van-button> -->
      </view>
    </view>
    <view class="stu-login-sumbit" v-if="!shopRegBtn">
      <button @click="sumbitSchool('提交')" type="primary" :loading="btnLoad" plain="true">提交</button>
    </view>
    <view class="stu-login-sumbit" v-else>
      <button @click="sumbitSchool('修改')" type="primary" :loading="btnLoad" plain="true">修改</button>
    </view>
  </view>
</template>

<script>
  export default {
    name: "shopReg",
    props: ['shopRegBtn', 'shopInfo'],
    data() {
      return {
        btnLoad: false,
        fileList: [],
        // fileName: "",
        shopPerson: "",
        shopName: "",
        shopLocatin: "",
        schoolId: "",
        user: {},
        initImg: ""
        // regShowId:"shopOk"
      };
    },
    methods: {
      getShopPerson(e) {
        this.shopPerson = e.detail
        // console.log(this.shopRegBtn)
      },
      getShopName(e) {
        this.shopName = e.detail
      },
      getShopLocatin(e) {
        this.shopLocatin = e.detail
      },
      getSchoolId(e) {
        this.schoolId = e.detail
      },
      loadPhoto(e) {
        this.fileList = [{
          url: e.detail.file.url
        }]
      },
      delPhoto(e) {
        this.fileList = []
      },
      // 上传菜品图片到服务器
      uploadPhoto() {
        // console.log("上传图片",this.shopPerson)
        uni.uploadFile({
          url: 'https://zsm.kknbb.cc:3090/util/upload',
          filePath: this.fileList[0].url,
          name: "file",
          success: (res1) => {
            // console.log(res.data);
            this.fileList[0].url = res1.data
            // console.log(this.fileList[0].url)
            this.upLoadInfo()
          }
        });
      },
      // 上传信息
      upLoadInfo() {
        // console.log("上传信息",this.shopPerson)
        uni.$http.post('/user/addShop', {
          shopPerson: this.shopPerson,
          shopName: this.shopName,
          shopLocatin: this.shopLocatin,
          schoolId: this.schoolId,
          shoppOpenid: this.shopInfo.userOpenid,
          fileUrl: this.fileList[0].url
        }).then((res2) => {
          uni.$showPro('提交成功')
          this.$emit("regShowId", "shopOk")
          uni.$emit('ownShop', [{
            schoolid: this.schoolId
          }])
        }).catch((err2) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 修改信息
      upLoadChange() {
        uni.$http.post('/user/changeShop', {
          shoppOpenid: this.user.userOpenid,
          shopPerson: this.shopPerson,
          shopName: this.shopName,
          shopLocatin: this.shopLocatin,
          fileUrl: this.fileList[0].url
        }).then((res) => {
          uni.$showPro('修改成功')
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 修改信息
      changeInfo() {
        if (this.initImg == this.fileList[0].url) {
          this.upLoadChange()
        } else {
          uni.uploadFile({
            url: 'https://zsm.kknbb.cc:3090/util/upload',
            filePath: this.fileList[0].url,
            name: "file",
            success: (res1) => {
              // console.log(res.data);
              this.fileList[0].url = res1.data
              // console.log(this.fileList[0].url)
              this.upLoadChange()
            }
          });
        }
      },
      // 验证学校id
      checkSchoolId() {
        uni.$http.post('/user/checkSchoolId', {
          schoolId: this.schoolId
        }).then((res3) => {
          // console.log(res3.data)
          if (res3.data) {
            this.uploadPhoto()
          } else {
            uni.$showPro("您的学校id不正确，请确认后重新输入！")
            return
          }
        }).catch((err3) => {
          console.log(err3)
          uni.$showPro()
        })
      },
      sumbitSchool(e) {
        if (e == "提交") {
          // console.log(this.fileList)
          if (this.shopPerson == '') {
            uni.$showPro("请填写负责人名称")
          } else if (this.shopName == '') {
            uni.$showPro("请填写商铺名称")
          } else if (this.shopLocatin == '') {
            uni.$showPro("请填写班组号")
          } else if (this.schoolId == "") {
            uni.$showPro("请填写学校id")
          } else if (this.fileList.length == 0) {
            uni.$showPro("请上传商铺图片")
          } else {
            this.checkSchoolId()
          }
        } else if (e == "修改") {
          if (this.shopPerson == '') {
            uni.$showPro("请填写负责人名称")
          } else if (this.shopName == '') {
            uni.$showPro("请填写商铺名称")
          } else if (this.shopLocatin == '') {
            uni.$showPro("请填写班组号")
          } else if (this.schoolId == "") {
            uni.$showPro("请填写学校id")
          } else if (this.fileList.length == 0) {
            uni.$showPro("请上传商铺图片")
          } else {
            this.changeInfo()
          }
        }
        // this.uploadPhoto()
      },
      // 初始化信息
      initInfo() {
        if (this.shopRegBtn == true) {
          // 若商家已经注册
          // console.log(this.shopInfo)
          this.user = uni.getStorageSync('user')
          // console.log(this.user)
          uni.$http.post('/user/selectShopId', {
            selectStuId: this.user.userOpenid
          }).then((res) => {
            if (res.data != false) {
              // console.log(res.data[0])
              // 初始化并且渲染商铺信息
              this.shopPerson = res.data[0].shopperson
              this.shopName = res.data[0].shopname
              this.shopLocatin = res.data[0].shoplocatin
              this.schoolId = res.data[0].schoolid
              this.fileList = [{
                url: res.data[0].filelist
              }]
              this.initImg = res.data[0].filelist
            }
          }).catch((err) => {
            console.log(err)
            uni.$showPro()
          })
        } else {
          // 若商家未注册
        }
      }
    },
    created() {
      this.initInfo()
    }
  }
</script>

<style lang="scss">
  .shop-login-box {
    .photo-box {
      margin-top: 10px;
      margin-left: 8px;

      .photo-text {
        margin-bottom: 10rpx;
        font-size: 15px;
        color: gray;

        .after-text {
          color: red;
          margin-right: 1px;
        }
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
  }

  .stu-login-sumbit {
    width: 60%;
    margin: 0 auto;
    margin-top: 40rpx;
  }
</style>
