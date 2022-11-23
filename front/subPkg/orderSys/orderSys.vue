<template>
  <view class="scroll-view-container">
    <!-- 刷新按钮 -->
    <view class="refresh-btn" @click="refreshScroll">
      <van-icon name="replay" size="30px" />
    </view>
    <scroll-view scroll-y="true" :style="{height:enableHeight+'px'}" class="left-scroll-view">
      <block v-for="(item,index) in cateList" :key="index">
        <view :class="['left-scroll-view-item ', index === active ? 'active' :'']" @click="activeChange(index)">
          {{item.sysName}}
        </view>
      </block>
    </scroll-view>
    <view class="right-scroll-view">
      <scroll-view scroll-y="true" :style="{height:enableHeight+'px'}" class="scroll-item2" :scroll-top="scrollTop"
        v-show="showRight == 0">
        <view class="right-scroll-none" v-if="readyMealList.length == 0 ? true : false">
          <van-icon name="records" size="50px" />
          <view class="right-scroll-none-text">未选择已有餐食</view>
        </view>
        <uni-swipe-action>
          <block v-for="(item, index) in readyMealList" :key="index">
            <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。 -->
            <!-- 需要通过 options 属性来指定操作按钮的配置信息 -->
            <uni-swipe-action-item :right-options="options2" @click="reduceOne(item)">
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
                    <!-- 商品价格 -->
                    <!-- 用 toFixed()方法 处理商品价格 -->
                    <view class="goods-price">￥{{item.info[0].price}}</view>
                    <!-- <view class="goods-time">{{item.info[0].waitTime}}分钟</view> -->
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </scroll-view>
      <scroll-view scroll-y="true" :style="{height:enableHeight+'px'}" class="scroll-item2" :scroll-top="scrollTop"
        v-show="showRight == 1">
        <view class="right-scroll-none" v-if="madeMealList.length == 0 ? true : false">
          <van-icon name="records" size="50px" />
          <view class="right-scroll-none-text">未选择现做餐食</view>
        </view>
        <uni-swipe-action>
          <block v-for="(item, index) in madeMealList" :key="index">
            <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。 -->
            <!-- 需要通过 options 属性来指定操作按钮的配置信息 -->
            <uni-swipe-action-item :right-options="options3" @click="actionMeals($event,item)">
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
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </scroll-view>
      <scroll-view scroll-y="true" :style="{height:enableHeight+'px'}" class="scroll-item2" :scroll-top="scrollTop"
        v-show="showRight == 2">
        <view class="right-scroll-none" v-if="mealList.length == 0 ? true : false">
          <van-icon name="records" size="50px" />
          <view class="right-scroll-none-text">未添加您的菜品</view>
        </view>
        <uni-swipe-action>
          <block v-for="(item, index) in mealList" :key="index">
            <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。 -->
            <!-- 需要通过 options 属性来指定操作按钮的配置信息 -->
            <uni-swipe-action-item :right-options="options" @click="orderMeals($event,item)">
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
                    <view class="goods-time">{{item.waitTime/60000}}分钟</view>
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </scroll-view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        nowShow:"",
        user: {},
        // 当前设备可用高度
        enableHeight: 0,
        cateList: [{
          sysName: "已有餐食",
          children: [{
            name: "123"
          }]
        }, {
          sysName: "现做餐食",
          children: [{
            name: "456"
          }]
        }, {
          sysName: "点餐",
          children: [{
            name: "789"
          }]
        }],
        active: 0,
        scrollTop: 0,
        showRight: 0,
        mealList: [],
        options: [{
            text: '已有',
            style: {
              backgroundColor: '#5bae23'
            }
          },
          {
            text: '现做',
            style: {
              backgroundColor: '#d2b116'
            }
          }
        ],
        readyMealList: [],
        options2: [{
          text: '售出',
          style: {
            backgroundColor: '#c45a65'
          }
        }],
        madeMealList: [],
        options3: [{
          text: '售出',
          style: {
            backgroundColor: '#c45a65'
          }
        }, {
          text: '出餐',
          style: {
            backgroundColor: '#f0945d'
          }
        }, {
          text: '合并',
          style: {
            backgroundColor: '#619ac3'
          }
        }]
      };
    },
    computed: {
      // countDown(creatTime) {
      //   console.log(new Date().toLocaleTimeString())
      // }
    },
    methods: {
      activeChange(index) {
        this.active = index
        this.showRight = index
        this.scrollTop = Math.random()
      },
      // 已有餐食
      getAllReadyMeal() {
        uni.$http.post('/user/getReadyMeal', {
          openid: this.user.userOpenid
        }).then((res) => {
          // console.log(res.data)
          this.readyMealList = res.data
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      reduceOne(item) {
        // console.log(item)
        uni.$http.post('/user/orderComplete', {
          openid: item.openid,
          rank: item.rank
        }).then((res) => {
          this.getAllReadyMeal()
          uni.$showPro('已售出')
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 现做餐食
      getAllMadeMeal() {
        uni.$http.post('/user/getMadeMeal', {
          openid: this.user.userOpenid,
          time: new Date().getTime()
        }).then((res) => {
          // console.log(res.data)
          this.madeMealList = res.data
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      },
      // 后面的rank数组
      lastRank(r) {
        let temArr = []
        for (let i = 0; i < this.madeMealList.length; i++) {
          if (this.madeMealList[i].rank[0] > r) {
            temArr.push(this.madeMealList[i].rank)
          }
        }
        return temArr
      },
      // 查询前面相同的菜品
      searchJoin(name, rank) {
        for (let i = 0; i < this.madeMealList.length; i++) {
          if (this.madeMealList[i].info[0].name == name && this.madeMealList[i].rank[0] != rank) {
            return this.madeMealList[i].rank
          }
        }
        return false
      },
      actionMeals(e, item) {
        if (e.content.text === '售出') {
          if (this.leftWaitTime(item.successtime) == 0) {
            uni.$http.post('/user/orderComplete', {
              openid: item.openid,
              rank: item.rank
            }).then((res) => {
              this.getAllMadeMeal()
              uni.$showPro('已售出')
            }).catch((err) => {
              console.log(err)
              uni.$showPro()
            })
          } else {
            uni.$showPro("该商品未出餐")
          }
        } else if (e.content.text === '合并') {
          let seaRes = this.searchJoin(item.info[0].name, item.rank[0])
          if (seaRes == false) {
            uni.$showPro("没有可以合并的菜品")
            return
          } else {
            let rankArr = this.lastRank(item.rank[0])
            console.log(item)
            uni.$http.post('/user/joinOrder', {
              openid: item.openid,
              rank1: seaRes,
              rank2: item.rank,
              mongoId: item._id,
              rankArr,
              wT: item.info[0].waitTime
            }).then((res) => {
              uni.$showPro("合并成功")
              this.getAllMadeMeal()
            }).catch((err) => {
              console.log(err)
              uni.$showPro()
            })
          }
        } else if (e.content.text === '出餐') {
          if (this.leftWaitTime(item.successtime) != 0) {
            let rankArr = this.lastRank(item.rank[0])
            uni.$http.post('/user/eatOut', {
              openid: item.openid,
              rank: item.rank,
              rankArr,
              wT: item.info[0].waitTime
            }).then((res) => {
              uni.$showPro("出餐成功")
              this.getAllMadeMeal()
            }).catch((err) => {
              console.log(err)
              uni.$showPro()
            })
          } else {
            uni.$showPro("该商品只能售出，不能出餐")
          }
        }
      },
      // 点餐
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
      orderMeals(e, item) {
        // console.log(e, item)
        if (e.content.text === '已有') {
          uni.$http.post('/user/addReadyMeal', {
            openid: item.shoppOpenid,
            mongodbId: item._id
          }).then((res) => {
            this.getAllReadyMeal()
            uni.$showPro('已有餐食添加成功')
          }).catch((err) => {
            console.log(err)
            uni.$showPro()
          })
        } else if (e.content.text === '现做') {
          uni.$http.post('/user/addMadeMeal', {
            openid: item.shoppOpenid,
            mongodbId: item._id
          }).then((res) => {
            this.getAllMadeMeal()
            uni.$showPro('现做餐食添加成功')
          }).catch((err) => {
            console.log(err)
            uni.$showPro()
          })
        }
      },
      // 初始化页面信息
      initMealInfo() {
        this.user = uni.getStorageSync('user')
        this.getAllMeal()
        this.getAllReadyMeal()
        this.getAllMadeMeal()
      },
      // 剩余等待时间
      leftWaitTime(successTime) {
        let currTime = new Date().getTime()
        let res = successTime - currTime >= 0 ? (successTime - currTime) / 60000 : 0
        return res
      },
      // 刷新按钮
      refreshScroll(){
        if(this.showRight == 0){
          this.getAllReadyMeal()
        }else if(this.showRight == 1){
          this.getAllMadeMeal()
        }else if(this.showRight == 2){
          this.getAllMeal()
        }
      }
      // 暂时不需要的api
      // countDown(creatTime) {
      //   console.log(new Date().getTime())
      // },
      // getCurrTime() {
      //   let temTime1 = new Date() + ""
      //   let temTime2 = temTime1.split(" ")
      //   let temMonth = new Date().getMonth() + 1
      //   let currTime = `${temTime2[3]}-${temMonth}-${temTime2[2]} ${temTime2[4]}`
      //   // console.log(currTime)
      //   return currTime
      // },
      // TimeDifference(Stime, Ttime) {
      //   //判断开始时间是否大于结束日期
      //   if (Stime > Ttime) {
      //     console.log("开始时间不能大于结束时间！");
      //     return false;
      //   }
      //   if (Ttime && Stime) {
      //     var startDate = new Date(Stime);
      //     var stopDate = new Date(Ttime);
      //     var startTime = startDate.getTime();
      //     var stopTime = stopDate.getTime();
      //     var cTime = Number(stopTime) - Number(startTime);
      //     var secondTime = cTime / 1000 / 60;
      //     return parseInt(secondTime);
      //   } else {
      //     return 0;
      //   }
      // },
      // 累积菜品等待时间
      // accWaitTime(index) {
      //   if (index > 0) {
      //     let res = 0
      //     for (let i = 0; i <= index; i++) {
      //       res += +this.madeMealList[i].info[0].waitTime
      //     }
      //     return res
      //   } else {
      //     return this.madeMealList[0].info[0].waitTime
      //   }
      // },
    },
    onLoad(options) {
      // console.log(options)
      // 数据加载时,使用uni-app定义的api,获取页面可使用高度
      this.enableHeight = uni.getSystemInfoSync().windowHeight - 50
      this.initMealInfo()
      // console.log(this.TimeDifference("2022-11-22 00:22:22", this.getCurrTime()))
      this.leftWaitTime()
    },
    created() {
      this.activeChange(0)
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    // width: 100%;
    // height: 100%;
    background-color: rgb(247, 247, 247);
    display: flex;
    
    .refresh-btn{
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      background-color: #FFFFFF;
      position: fixed;
      bottom: 50rpx;
      left: 50rpx;
      box-shadow: 5px 5px 10px #d0d0d0;
    }
    
    .left-scroll-view {
      width: 240rpx;

      .left-scroll-view-item {
        line-height: 120rpx;
        // background-color: #f7f7f7;
        background-color: rgb(250, 250, 250);
        border-bottom: 1px solid #f0f0f0;
        text-align: center;
        font-size: 24rpx;

        &.active {
          // background-color: #ffffff;
          background-color: rgb(255, 255, 255);
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 6rpx;
            height: 60rpx;
            background-color: #ee3f4d;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right-scroll-view {
      background-color: rgb(245, 245, 245);
      display: flex;
      width: 100%;

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

      .scroll-item0 {}

      .scroll-item1 {}

      .scroll-item2 {
        // display: flex;
        // width: 100%;

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
      }
    }
  }
</style>
