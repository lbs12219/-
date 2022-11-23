<template>
  <view>
    <view class="right-scroll-none" v-if="mealList.length == 0 ? true : false">
      <van-icon name="records" size="50px" />
      <view class="right-scroll-none-text">未添加您的菜品</view>
    </view>
    <view class="">
      <uni-swipe-action>
        <block v-for="(item, index) in mealList" :key="index">
          <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。 -->
          <!-- 需要通过 options 属性来指定操作按钮的配置信息 -->
          <uni-swipe-action-item :right-options="options" @click="delCartGoods(item)">
            <!-- 商品item -->
            <view class="goods-item">
              <!-- 商品左侧区域 -->
              <view class="goods-item-left">
                <!-- 商品左侧图片 -->
                <image :src="item.fileList" class="goods-pic">
                </image>
              </view>
              <!-- 商品右侧信息区域 -->
              <view class="goods-item-right">
                <!-- 商品标题 -->
                <view class="goods-name">{{item.name}}</view>
                <view class="goods-name">商品简介：{{item.mealinfo}}</view>
                <view class="goods-info-box">
                  <!-- 商品价格 -->
                  <!-- 用 toFixed()方法 处理商品价格 -->
                  <view class="goods-price">￥{{item.price}}</view>
                  <view class="goods-time">预计等待时间：{{item.waitTime/60000}}分钟</view>
                </view>
              </view>
            </view>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 配置 uni-swipe-action组件 的样式
        options: [{
          // 显示的文本内容
          text: '删除',
          // 按钮的背景颜色
          style: {
            backgroundColor: '#C00000'
          }
        }],
        user: {},
        mealList: []
      };
    },
    methods: {
      delCartGoods(e) {
        // console.log(e)
        uni.$http.post('/user/delMeal', {
          id: e._id
        }).then((res) => {
          uni.$showPro("删除成功")
          this.getAllMeal()
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      getAllMeal() {
        uni.$http.post('/user/getAllMeal', {
          shoppOpenid: this.user.userOpenid
        }).then((res) => {
          // console.log(res.data)
          this.mealList = res.data
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      initMealInfo() {
        this.user = uni.getStorageSync('user')
        this.getAllMeal()
      }
    },
    onLoad() {
      this.initMealInfo()
    }
  }
</script>

<style lang="scss">
  .right-scroll-none {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .right-scroll-none-text {
      margin-top: 20rpx;
    }
  }

  .goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fefefe;

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
</style>
