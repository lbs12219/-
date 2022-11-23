<template>
  <view>
    <view>

    </view>
    <van-tabs animated sticky>
      <van-tab title="已有菜品">
        <view class="right-scroll-none" v-if="readyMealList.length == 0 ? true : false">
          <van-icon name="records" size="50px" />
          <view class="right-scroll-none-text">该商家没有“已有餐食”</view>
        </view>
        <!-- 商品item -->
        <block v-for="(item, index) in readyMealList" :key="index">
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
                <!-- 商品价格 -->
                <!-- 用 toFixed()方法 处理商品价格 -->
                <view class="goods-price">￥{{item.info[0].price}}</view>
                <!-- <view class="goods-time">{{item.info[0].waitTime}}分钟</view> -->
              </view>
            </view>
          </view>
        </block>
      </van-tab>
      <van-tab title="现做菜品">
        <view class="right-scroll-none" v-if="madeMealList.length == 0 ? true : false">
          <van-icon name="records" size="50px" />
          <view class="right-scroll-none-text">该商家没有“现做餐食”</view>
        </view>
        <block v-for="(item, index) in madeMealList" :key="index">
          <!-- 商品item -->
          <view :class=" leftWaitTime(item.successtime) == 0 ? 'goods-item deadLine' : 'goods-item'">
            <!-- 商品左侧区域 -->
            <view class="goods-item-left">
              <!-- 商品左侧图片 -->
              <image :src="item.info[0].fileList" class="goods-pic">
              </image>
            </view>
            <!-- 商品右侧信息区域 -->
            <view class="goods-item-right">
              <!-- 商品标题 -->
              <view class="goods-prompt" v-if="leftWaitTime(item.successtime) == 0 ? true : false">
                已出餐
              </view>
              <view class="goods-name">{{item.info[0].name}}</view>
              <view class="goods-name">商品简介：{{item.info[0].mealinfo}}</view>
              <view class="goods-info-box">
                <!-- 商品价格 -->
                <!-- 用 toFixed()方法 处理商品价格 -->
                <view class="goods-price">￥{{item.info[0].price}}</view>
                <!-- <view class="goods-time">{{item.info[0].waitTime}}分钟</view> -->
                <view class="goods-time"><span
                    style="font-size: 14px;">等待时间：</span>{{leftWaitTime(item.successtime).toFixed(1)}}分钟</view>
              </view>
            </view>
          </view>
          <view class="goods-bottom">
            订单编号：
            <block v-for="(item2,index2) in item.rank" :key="index2">
              <span>“{{item2}}”</span>
            </block>
          </view>
        </block>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        shopOpenid: "",
        readyMealList: [],
        madeMealList: []
      };
    },
    methods: {
      // 已有餐食
      getAllReadyMeal() {
        uni.$http.post('/user/getReadyMeal', {
          openid: this.shopOpenid
        }).then((res) => {
          // console.log(res.data)
          this.readyMealList = res.data
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 现做餐食
      getAllMadeMeal(cb) {
        uni.$http.post('/user/getMadeMeal', {
          openid: this.shopOpenid,
          time: new Date().getTime()
        }).then((res) => {
          // console.log(res.data)
          this.madeMealList = res.data
          cb && cb()
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 剩余等待时间
      leftWaitTime(successTime) {
        let currTime = new Date().getTime()
        let res = successTime - currTime >= 0 ? (successTime - currTime) / 60000 : 0
        return res
      },
      // 初始化菜品
      initShopMeal(cb) {
        this.getAllReadyMeal()
        this.getAllMadeMeal()
        cb && cb()
      }
    },
    onLoad(options) {
      this.shopOpenid = options.id
      this.initShopMeal()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      this.getAllReadyMeal()
      this.getAllMadeMeal(()=>{
        uni.stopPullDownRefresh()
        uni.$showPro('刷新成功')
      })
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

      .goods-prompt {
        position: absolute;
        right: 0;
        top: 0;
        border: 1px solid #c00000;
        padding: 2px;
        font-size: 18px;
      }

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
</style>
