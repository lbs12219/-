<template>
  <view>
    <view class="right-scroll-none" v-if="soldMealList.length == 0 ? true : false">
      <van-icon name="records" size="50px" />
      <view class="right-scroll-none-text">您没有已售出餐食</view>
    </view>
    <block v-for="(item, index) in soldMealList" :key="index">
      <!-- 商品item -->
      <view class="goods-item">
        <!-- 商品左侧区域 -->
        <view class="goods-item-left">
          <!-- 商品左侧图片 -->
          <image :src="item.info[0].fileList" class="goods-pic">
          </image>
        </view>
        <!-- 商品右侧信息区域 -->
        <view class="goods-item-right">
          <!-- 商品标题 -->
          <view style="font-size: 15px;">
            订单编号：
            <span style="font-weight: bold;">{{item.rank}}</span>
          </view>
          <view class="goods-name">{{item.info[0].name}}</view>
          <view class="goods-name">商品简介：{{item.info[0].mealinfo}}</view>
          <view class="goods-info-box">
            <view class="goods-price">￥{{item.info[0].price}}</view>
          </view>
        </view>
      </view>
    </block>
    <view class="solt-bottom"></view>
    <view class="sold-price-box">
      总计：￥{{allPrice.toFixed(2)}}
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        soldMealList: [],
        user: {}
      };
    },
    computed: {
      allPrice() {
        let res = 0
        for (let i = 0; i < this.soldMealList.length; i++) {
          res += +this.soldMealList[i].info[0].price
        }
        return res
      }
    },
    methods: {
      getSoldMeal() {
        uni.$http.post('/user/getHasSold', {
          openid: this.user.userOpenid
        }).then((res) => {
          this.soldMealList = res.data
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      initSoldMeal() {
        this.user = uni.getStorageSync('user')
        this.getSoldMeal()
      }
    },
    onLoad() {
      this.initSoldMeal()
    }
  }
</script>

<style lang="scss">
  .right-scroll-none {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .right-scroll-none-text {
      margin-top: 20rpx;
    }
  }

  .goods-item {
    flex: 1;
    // 让 goods-item 项占满整个屏幕的宽度
    width: 100%;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    // background-color: #fefefe;
    background-color: rgb(253, 253, 253);

    .goods-item-left {
      margin-left: 5px;
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      position: relative;
      font-size: 22px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }

      .goods-time {
        font-size: 16px;
        color: #c00000;
        margin-right: 10px;
      }
    }
  }

  .goods-bottom {
    padding: 2px;
    // border-bottom: 1px solid #322f3b;
    border-bottom: 2px solid rgb(230, 230, 230);
    background-color: #fefefe;
  }

  .deadLine {
    background-color: #f2b9b2;
  }

  .sold-price-box {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100vw;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    background-color: #FFFFFF;
    box-shadow: 0px -2px 5px #d0d0d0;
  }
  
  .solt-bottom{
    height: 50px;
  }
</style>
