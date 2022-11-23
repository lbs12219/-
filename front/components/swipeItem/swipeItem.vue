<template>
  <view>
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
                <view class="goods-time">{{item.waitTime}}分钟</view>
              </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  export default {
    props:["options",]
    name: "swipeItem",
    data() {
      return {

      };
    }
  }
</script>

<style>

</style>
