<template>
  <view class="shop-wapper">
    <view class="shop-top-box" v-if="!user.token">
      <text>食怡</text>
      <image src="@/static/shop/mifan.png"></image>
    </view>
    <!-- 登录 -->
    <view class="shop-content-box-box">
      <view class="shop-content-box" v-if="!user.token">
        <!-- <view class="shop-content-bgc">
        </view> -->
        <!-- 商家 -->
        <view class="shop-shopper-box">
          <view class="shop-shopper-item" @click="shopLogin()">
            <image src="@/static/shop/shopper.png"></image>
            <text class="shop-shopper-text">我是商家</text>
          </view>
        </view>
        <!-- 用户 -->
        <view class="shop-stu-box">
          <view class="shop-stu-item" @click="stuLogin()">
            <image src="@/static/shop/student.png"></image>
            <text class="shop-shopper-text">我是学生</text>
          </view>
        </view>
      </view>
      <!-- 学生已登录 -->
      <view class="stu-login-box" v-if="showId == 'student'">
        <view class="stu-login-info">
          <image :src="user.userInfo.avatarUrl"></image>
          <text>{{user.userInfo.nickName}}</text>
        </view>
        <view class="divider" />
        <!-- 我的信息 -->
        <van-cell title="我的信息" @click="goStuInfo" size="large" is-link="true" />
        <!-- <van-button>修改</van-button> -->
        <view class="stu-login-sumbit2">
          <button @click="unLogin" type="warn" plain="true">退出登录</button>
        </view>
      </view>
      <!-- 商家已登录未注册 -->
      <view v-if="showId == 'shop'">
        <view class="shop-login-solt"></view>
        <view class="shop-login-title">
          您还未入驻，请填写您的商铺信息！
        </view>
        <shopReg :shopRegBtn="shopRegBtn" :shopInfo="user" @regShowId="regShowId"></shopReg>
      </view>
      <!-- 商家已登录已注册 -->
      <view class="shop-ok-box" v-if="showId == 'shopOk'">
        <view class="shop-ok-info">
          <image :src="user.userInfo.avatarUrl"></image>
          <text>{{user.userInfo.nickName}}</text>
        </view>
        <view class="divider" />
        <!-- 我的信息 -->
        <van-cell title="我的信息" @click="goShopInfo" size="large" is-link="true" />
        <van-cell title="点餐系统" @click="goOrderSys" size="large" is-link="true" />
        <van-cell title="查看菜品" @click="goCheckMeal" size="large" is-link="true" />
        <van-cell title="添加菜品" @click="goAddMeal" size="large" is-link="true" />
        <van-cell title="查看售出菜品" @click="goCheckSold" size="large" is-link="true" />
        <!-- <van-button>修改</van-button> -->
        <view class="shop-ok-sumbit2">
          <button @click="unLogin" type="warn" plain="true">退出登录</button>
        </view>
      </view>
    </view>
    <!-- 底部 -->
    <view class="shop-bottom-box">
      <text class="shop-bottom-text" @click="goAboutUs">联系我们</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "shop",
    data() {
      return {
        user: {
          userInfo: {},
          userOpenid: "",
          token: false,
        },
        showId: "",
        shopRegBtn: false
      };
    },
    methods: {
      stuLogin() {
        uni.getUserProfile({
          // 声明获取用户个人信息后的用途，不超过30个字符
          desc: '仅获取您的授权信息',
          success: (res) => {
            // console.log(res)
            this.user.userInfo = res.userInfo
            this.user.token = true

            // 获取用户openid
            this.getToken("stu")
          },
          // 接口调用失败的回调函数
          fail: (err) => {
            uni.$showPro("您取消了登录授权")
            console.log(err)
          }
        })
      },
      // 获取学校列表
      getAllSchool(e) {
        uni.$http.get('/user/getAllSchools').then((res3) => {
          let mySchool = res3.data.filter((item) => {
            return item.schoolname == e
          })
          // console.log(mySchool)
          uni.$emit('ownShop', mySchool)
        }).catch((err3) => {
          console.log(err3)
          uni.$showPro()
        })
      },
      // 调用登录接口，换取永久的 token
      getToken(info) {
        let that = this
        uni.login({
          success(res) {
            if (res.code) {
              // 通过后端发送请求换取openid
              // console.log(res.code)
              uni.$http.post('/util/getOpenid', {
                userCode: res.code
              }).then((result) => {
                that.user.userOpenid = result.data.openid
                // console.log(result.data)
                uni.setStorageSync('user', that.user)
                // uni.setStorageSync('token', that.token)
                if (info == "stu") {
                  uni.$http.post('/user/selectStuId', {
                    stuOpenid: that.user.userOpenid
                  }).then((res1) => {
                    // console.log(that.user.userOpenid)
                    if (!res1.data) {
                      that.goStuInfo()
                      that.showId = "student"
                    } else {
                      // that.goStuInfo()
                      that.showId = "student"
                      // console.log(res1.data[0].school)
                      // uni.$emit('ownShop',10)
                      that.getAllSchool(res1.data[0].school)
                    }
                  }).catch((err1) => {
                    console.log(err1)
                    uni.$showPro()
                  })
                } else if (info == "shop") {
                  uni.$http.post('/user/selectShopId', {
                    selectStuId: that.user.userOpenid
                  }).then((res2) => {
                    // console.log(res2)
                    if (res2.data == false) {
                      that.showId = "shop"
                    } else {
                      that.showId = "shopOk"
                      console.log(res2.data[0].schoolid)
                      uni.$emit('ownShop', [{
                        schoolid: res2.data[0].schoolid
                      }])
                    }
                  }).catch((err2) => {
                    console.log(err2)
                    uni.$showPro()
                  })
                }
              }).catch((err) => {
                console.log(err)
                uni.$showPro()
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      },
      // 获取localstorage
      getStore() {
        this.user = uni.getStorageSync('user')
        // this.token = uni.getStorageSync('token')
      },
      clearStore() {
        uni.setStorageSync('user', {});
        // uni.setStorageSync('token', false)
      },
      unLogin() {
        const shelf = this
        uni.showModal({
          title: '提示',
          content: '确认退出登录吗？',
          success(res) {
            if (res.confirm) {
              shelf.user = {}
              shelf.user.token = false
              shelf.clearStore()
              shelf.showId = ""
              // shelf.getStore()
              uni.$emit('ownShop', [{
                schoolid: ""
              }])
            }
          }
        })
      },
      shopLogin() {
        uni.getUserProfile({
          // 声明获取用户个人信息后的用途，不超过30个字符
          desc: '仅获取您的授权信息',
          success: (res) => {
            this.user.userInfo = res.userInfo
            this.user.token = true
            this.getToken("shop")
          },
          // 接口调用失败的回调函数
          fail: (err) => {
            uni.$showPro("您取消了登录授权")
            console.log(err)
          }
        })
      },
      // 学生信息
      goStuInfo() {
        uni.navigateTo({
          url: "/subPkg/stuInfo/stuInfo",
          success: function(res) {
            // 通过 eventChannel 向被打开页面传送数据
            // res.eventChannel.emit('acceptDataFromOpenerPage', {
            //   data: 'test'
            // })
          }
        })
      },
      // 商铺信息
      goShopInfo() {
        uni.navigateTo({
          url: "/subPkg/shopInfo/shopInfo",
        })
      },
      goAddMeal() {
        uni.navigateTo({
          url: "/subPkg/addMeal/addMeal",
        })
      },
      goOrderSys() {
        uni.navigateTo({
          url: "/subPkg/orderSys/orderSys",
        })
      },
      goCheckMeal() {
        uni.navigateTo({
          url: "/subPkg/checkMeal/checkMeal",
        })
      },
      goCheckSold() {
        uni.navigateTo({
          url: "/subPkg/checkSold/checkSold",
        })
      },
      goAboutUs() {
        uni.navigateTo({
          url: '/subPkg/aboutUs/aboutUs'
        })
      },
      regShowId(e) {
        this.showId = "shopOk"
      }
    },
    onLoad() {
      this.getStore()
    }
  }
</script>

<style lang="scss">
  .shop-top-box {
    width: 100vw;
    height: 300rpx;
    background-color: #83cbac;
    display: flex;
    flex-direction: row;

    text {
      width: 63%;
      font-size: 160rpx;
      text-align: center;
      margin-top: 20rpx;
      font-style: italic;
      color: #f1f0ed;
      // margin-left: 50%;
      // transform: translateY(100%);
    }

    image {
      width: 180rpx;
      height: 180rpx;
      // margin-left: 50%;
      // transform: translateX(-50%);
      margin-top: 40rpx;
    }
  }

  .shop-content-box-box {
    border-top-left-radius: 2.5em;
    border-top-right-radius: 2.5em;
    transform: translateY(-80rpx);
    background-color: #F5F5F5;
    // box-shadow: 0 -3px 5px #bbb5ac;
    box-shadow: 0 -3px 5px #6fad92;
  }

  .shop-content-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    // .shop-content-bgc {
    //   position: fixed;
    //   z-index: -1;
    //   top: 0px;
    //   width: 100vw;
    //   // height: 250rpx;
    //   height: 650rpx;
    //   background-color: #83cbac;

    //   &::after {
    //     content: "";
    //     position: absolute;
    //     // top: 0px;
    //     // right: 0px;
    //     left: 50%;
    //     bottom: 0px;
    //     width: 350rpx;
    //     height: 350rpx;
    //     border-radius: 100%;
    //     transform: translate(-50%,50%);
    //     // background-color: #F5F5F5;
    //     background-color: #83cbac;
    //   }

    // &::before {
    //   content: "";
    //   position: absolute;
    //   // top: 0px;
    //   left: 0px;
    //   bottom: 0px;
    //   width: 50%;
    //   height: 250rpx;
    //   border-radius: 100%;
    //   transform: translateY(50%);
    //   background-color: #83cbac;
    // }

    // &::after {
    //   content: "";
    //   position: absolute;
    //   // top: 0px;
    //   right: 0px;
    //   bottom: 0px;
    //   width: 50%;
    //   height: 250rpx;
    //   border-radius: 100%;
    //   transform: translateY(50%);
    //   background-color: #F5F5F5;
    // }

    // &::before {
    //   content: "";
    //   position: absolute;
    //   // top: 0px;
    //   left: 0px;
    //   bottom: 0px;
    //   width: 50%;
    //   height: 250rpx;
    //   border-radius: 100%;
    //   transform: translateY(50%);
    //   background-color: #83cbac;
    // }
    // }

    .shop-shopper-box {
      // height: 40%;
      margin-top: 100rpx;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;

      .shop-shopper-item {
        width: 70vw;
        height: 200rpx;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: #FFFFFF;
        // box-shadow: 3px 3px 6px gray;
        box-shadow: 8px 8px 20px #d0d0d0,
          -8px -8px 20px #ffffff;

        image {
          width: 150rpx;
          height: 150rpx;
        }

        .shop-shopper-text {
          margin-top: 20rpx;
          font-size: 40rpx;
          // text-align: center;
          -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 30%, rgba(255, 255, 255, .3));
        }
      }


    }

    .shop-stu-box {
      // height: 40%;
      margin-top: 100rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .shop-stu-item {
        width: 70vw;
        height: 200rpx;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: #FFFFFF;
        // box-shadow: 3px 3px 6px gray;
        box-shadow: 8px 8px 20px #d0d0d0,
          -8px -8px 20px #ffffff;

        image {
          width: 150rpx;
          height: 150rpx;
        }

        .shop-shopper-text {
          margin-top: 20rpx;
          font-size: 40rpx;
          -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 30%, rgba(255, 255, 255, .3));
        }
      }
    }
  }

  .shop-wapper {
    height: 100vh;
    position: relative;
    // background-color: #F5F5F5;
    // background-color: #83cbac;

    .shop-bottom-box {

      .shop-bottom-text {
        position: absolute;
        bottom: 63px;
        left: 10px;
        font-size: 17px;
        color: #d6a01d;
      }
    }
  }

  .stu-login-box {
    background-color: #FFFFFF;

    .stu-login-info {
      margin-left: 60rpx;
      padding-top: 120rpx;
      margin-bottom: 20rpx;
      display: flex;
      flex-direction: row;
      // justify-content: center;
      align-items: center;

      image {
        width: 130rpx;
        height: 130rpx;
        border-radius: 100%;
      }

      text {
        margin-left: 30rpx;
        font-size: 40rpx;
      }
    }

    .stu-login-sumbit2 {
      margin: 0 auto;
      margin-top: 40rpx;
      width: 60%;
      padding-bottom: 60rpx;
      // background-color: #F5F5F5;
    }

    .divider {
      // background: #E0E3DA;
      background: #F5F5F5;
      width: 100%;
      height: 30rpx
    }
  }

  .shop-login-solt {
    height: 10vh;
  }

  .shop-login-title {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 40rpx;
    text-align: center;
    color: #d2b116;
    // display: block;
  }

  .shop-ok-box {
    background-color: #FFFFFF;

    .shop-ok-info {
      margin-left: 60rpx;
      padding-top: 120rpx;
      margin-bottom: 20rpx;
      display: flex;
      flex-direction: row;
      // justify-content: center;
      align-items: center;

      image {
        width: 130rpx;
        height: 130rpx;
        border-radius: 100%;
      }

      text {
        margin-left: 30rpx;
        font-size: 40rpx;
      }
    }

    .shop-ok-sumbit2 {
      margin: 0 auto;
      margin-top: 40rpx;
      width: 60%;
      padding-bottom: 60rpx;
      // background-color: #F5F5F5;
    }

    .divider {
      // background: #E0E3DA;
      background: #F5F5F5;
      width: 100%;
      height: 30rpx
    }
  }
</style>
