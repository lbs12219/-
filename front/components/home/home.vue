<template>
  <view>
    <!-- 轮播图 -->
    <view class="home-swiper-box">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item v-for="(item,index) in swiperList" :key="inedx">
          <view class="swiper-item">
            <img :src="item.imgSrc">
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="home-shop-wapper" v-if="shopList.length != 0 ? true : false">
      <view class="home-shop-box" v-for="(item,index) in shopList" :key="index">
        <view class="home-shop-item">
          <view class="home-shop-card" @click="getShopMeal(item)">
            <image :src="item.filelist"></image>
            <!-- <image :src="defaultPic"></image> -->
            <view class="home-shop-card-text">
              <view class="home-item-text1">{{item.shopname}}</view>
              <view class="home-item-text2">{{item.shoplocatin}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="home-shop-none" v-if="shopList.length != 0 ? false : true">
      <!-- <view class="container">
        <view class="bubble"></view>
        <view class="shadow"></view>
      </view> -->
      <view class="home-shop-none-img">
        <image src="@/static/home/logo.png"></image>
      </view>
      <view class="home-shop-none-card">
        <view class="home-shop-none-top">
          <view class="heart">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </view>
          <view class="none-card-text">
            不好意思！暂时没有找到商家(╥╯^╰╥)
          </view>
        </view>
      </view>
      <view class="home-shop-none-btn">
        <van-icon name="phone" size="30px" color="#FFFFFF" @click="goAboutUs" />
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        swiperList: [{
          imgSrc: "https://zsm.kknbb.cc:3090/util/getImg?picUrl=public/imgs/swiper1.png"
        }, {
          imgSrc: "https://zsm.kknbb.cc:3090/util/getImg?picUrl=public/imgs/swiper2.png"
        }, {
          imgSrc: "https://zsm.kknbb.cc:3090/util/getImg?picUrl=public/imgs/swiper3.png"
        }],
        shopList: [],
        ownShopId: ""
      };
    },
    watch: {
      // 监听schoolid的变化
      ownShopId: {
        handler(newValue, oldValue) {
          if (newValue != oldValue) {
            this.getOwnSchoolShop()
          }
        },
        immediate: true
      }
    },
    methods: {
      getOwnSchoolShop() {
        uni.$http.post('/user/getAllShop', {
          schoolId: this.ownShopId
        }).then((res) => {
          // console.log(res.data)
          this.shopList = res.data
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      getShopMeal(item) {
        uni.navigateTo({
          url: `/subPkg/shopMeal/shopMeal?id=${item.openid}`
        })
        // console.log(item.openid)
      },
      goAboutUs() {
        uni.navigateTo({
          url: '/subPkg/aboutUs/aboutUs'
        })
      }
    },
    created() {
      uni.$on('ownShop', (e) => {
        this.ownShopId = e[0].schoolid
        // console.log(this.ownShopId)
      })
      // this.getOwnSchool()
    }
  }
</script>

<style lang="scss">
  .home-swiper-box {
    width: 90%;
    // height: 330rpx;
    height: 20%;
    border-radius: 40rpx;
    margin-top: 20rpx;
    margin: 0 auto;
    overflow: hidden;
    // background-color: #f5f5f5;
    // 兼容ios端
    transform: translateY(0);
    box-shadow: 4px 4px 8px #d0d0d0,
      -4px -4px 8px #ffffff;

    swiper {
      // height: 330rpx;
      // margin-top: 20rpx;
      // margin: 0 auto;
      // width: 90%;
      // background-color: #f5f5f5;

      .swiper-item,
      img {
        // background-color: #f5f5f5;
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
  }

  .home-shop-wapper {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    // align-items: center;

    .home-shop-box {
      // width: 100vw;

      .home-shop-item {
        margin-top: 30rpx;
        width: 50vw;
        height: 350rpx;
        // height: 0;
        // padding-bottom: 100%;
        // background-color: red;
        display: flex;
        justify-content: space-around;
        // margin: 0 auto;

        .home-shop-card {
          width: 40vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          // justify-content: space-around;
          align-items: center;
          background-color: #FFFFFF;
          // background-color: rgb(230, 230, 230);
          border-radius: 18rpx;
          box-shadow: 4px 4px 8px #d0d0d0,
            -4px -4px 8px #ffffff;

          image {
            width: 170rpx;
            height: 170rpx;
            border-radius: 10px;
            margin-top: 20rpx;
          }

          .home-shop-card-text {
            margin-left: 10rpx;
            margin-right: 10rpx;
            width: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;

            .home-item-text1 {
              margin-top: 20rpx;
              width: 100%;
              height: 50%;
              // margin-top: 20rpx;
            }

            .home-item-text2 {
              height: 50%;
              margin-top: 20rpx;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .home-shop-none {
    // height: 60vh;
    transform: translateY(-20%);

    .home-shop-none-img {
      margin-top: 50rpx;
      display: flex;
      justify-content: center;
      transform: translateY(50%);

      image {
        width: 300rpx;
        height: 300rpx;
      }
    }

    .home-shop-none-btn {
      margin: 0 auto;
      // margin-top: 30vh;
      width: 120rpx;
      height: 120rpx;
      background-color: #ebb10d;
      border-radius: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 120rpx;
      border: 10px solid #FFFFFF;
      transform: translateY(-30%);
      // color: #d6a01d;
      // box-shadow: 3px 3px 8px #c4c4c4,
      //   -3px -3px 8px #ffffff;
    }

    .home-shop-none-card {
      // transform: translateY(-50%);
      width: 90%;
      // height: 100%;
      margin: 0 auto;
      background-color: #FFFFFF;
      // background-color: rgb(230, 230, 230);
      margin-top: 30rpx;
      border-radius: 2em;
      // box-shadow: inset 5px 5px 13px #c4c4c4,
      //   inset -5px -5px 13px #ffffff;
      // box-shadow: 3px 3px 8px #c4c4c4,
      //   -3px -3px 8px #ffffff;
      padding-left: 30rpx;
      padding-top: 130rpx;
      padding-bottom: 130rpx;

      .home-shop-none-top {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;

        .none-card-text {
          width: 60%;
          font-size: 23px;
          display: flex;
          // justify-content: center;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
          padding: 30rpx;
          color: #363433;
        }
      }

      .heart {
        width: 140px;
        height: 110px;
        display: flex;
        justify-content: space-between;
      }

      .heart span {
        --c: plum;
        --h: 50%;
        --t: 25%;
        /* var()函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用 */
        background-color: var(--c);
        width: 10px;
        border-radius: 5px;
        position: relative;
        height: var(--h);
        top: var(--t);
        /* 执行动画 infinite是无限次播放 */
        animation: beating 3s infinite;
      }

      .heart span:nth-child(1),
      .heart span:nth-child(9) {
        --c: lightcoral;
        --h: 30px;
        --t: 22px;
      }

      .heart span:nth-child(2),
      .heart span:nth-child(8) {
        --c: lightskyblue;
        --h: 60px;
        --t: 6px;
      }

      .heart span:nth-child(3),
      .heart span:nth-child(7) {
        --c: lightgreen;
        --h: 80px;
        --t: 0;
      }

      .heart span:nth-child(4),
      .heart span:nth-child(6) {
        --c: gold;
        --h: 90px;
        --t: 8px;
      }

      .heart span:nth-child(5) {
        --c: plum;
        --h: 94px;
        --t: 16px;
      }

      @keyframes beating {

        0%,
        30% {
          height: var(--h);
          top: var(--t);
          background-color: var(--c);
          filter: blur(0);
        }

        60%,
        70% {
          height: 50%;
          top: 25%;
          background-color: plum;
          /* 模糊度 */
          // filter: blur(5px);
        }
      }
    }


  }
</style>
