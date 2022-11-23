<template>
  <view class="containerTab">
    <view class="tab-style1">
      <view class="follow" :style="'transform: translateX(' + followX + 'px);'">
        <view class="follow-left"></view>
        <view class="follow-right"></view>
      </view>
      <ul class="flex-center">
        <li>
          <!-- <span clas>home</span> -->
          <view :class="homeClass ? 'tab-item active' : 'tab-item'">
            <!-- :src="homeClass ? homeActiveSrc : homeUnactiveSrc" -->
            <image :src="homeClass ? '/static/tabbar/home-active.png' : '/static/tabbar/home.png'" id="homeActive"
              @click="goHome($event)">
            </image>
          </view>
        </li>
        <li>
          <!-- <span>bag</span> -->
          <view :class="shopClass ? 'tab-item active' : 'tab-item'">
            <image :src="shopClass ? '/static/tabbar/shop-active.png' : '/static/tabbar/shop.png'" id="shopActive"
              @click="goShop($event)">
            </image>
          </view>
        </li>
      </ul>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        homeClass: true,
        shopClass: false,
        followX: -80,
        homeActiveSrc: "/static/tabbar/home-active.png",
        homeUnactiveSrc: "/static/tabbar/home.png"
      }
    },
    methods: {
      goHome(e) {
        if (!this.homeClass) {
          this.homeClass = true
          this.shopClass = false
          this.followX = e.target.offsetLeft - 12
          this.$emit("changeTab", this.homeClass);
        }

      },
      goShop(e) {
        if (!this.shopClass) {
          this.homeClass = false
          this.shopClass = true
          this.followX = e.target.offsetLeft - 12
          this.$emit("changeTab", this.homeClass);
        }
      },
      initFollow() {
        if (this.homeClass) {
          let tabFollow1 = uni.createSelectorQuery().in(this).select('#homeActive')
          tabFollow1.fields({
            rect: true,
          }, (res) => {
            this.followX = res.left - 12
          }).exec()
        } else {
          let tabFollow2 = uni.createSelectorQuery().in(this).select('#shopActive')
          tabFollow2.fields({
            rect: true,
          }, (res) => {
            this.followX = res.left - 12
          }).exec()
        }
      }
    },
    mounted() {
      this.initFollow()
    }
  }
</script>

<style lang="scss">
  .containerTab {
    position: fixed;
    bottom: 0px;
    width: 100%;
    // height : 50px;
  }

  .tab-style1 {
    background-color: #c0d8ec;
    width: 100%;
    position: relative;
    transition: background-color 0.4s;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    li {
      background-color: #c0d8ec;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: top 0.2s ease-out, width 0.4s, border-radius 0.4s,
        box-shadow 0.4s;


      .tab-item {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background-color: #c0d8ec;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      image {
        width: 37px;
        height: 37px;
      }
    }
  }


  .follow {
    outline: none;
    position: absolute;
    top: 0px;
    // left: 18%;
    background-color: #F5F5F5;
    // background-color: red;
    width: 60px;
    height: 40px;
    // border-radius: 100%;
    border-radius: 0 0 60px 60px;
    // z-index: 1;
    // transform: translateX(135rpx);
    transition: transform .3s ease-out;
    // transition: left 0.4s ease-in, background-color 0.4s, border-color 0.4s;

    .follow-left,
    .follow-right {
      background-color: #F5F5F5;
      height: 25px;
      width: 25px;
      position: absolute;

      &:after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: #c0d8ec;
        display: block;
      }
    }

    .follow-left {
      left: -25px;

      &:after {
        border-radius: 0 25px 0 0;
      }
    }

    .follow-right {
      right: -25px;

      &:after {
        border-radius: 25px 0 0 0;
      }
    }
  }

  .active {
    // z-index: 100;
    width: 60px;
    height: 60px;
    // top: -2rem;
    border-radius: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transition: transform .4s ease-out;
    transform: translateY(-50%);
  }


  .flex-center {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
