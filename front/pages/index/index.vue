<template>
  <view class="">
    <home v-show="showPage"></home>
    <shop v-show="!showPage"></shop>
    <LbsTabBar @changeTab="changeTab"></LbsTabBar>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showPage: true
      }
    },
    methods: {
      changeTab(e) {
        // console.log(e)
        if (e) {
          this.showPage = true
        } else {
          this.showPage = false
        }
      }
    }
  }
</script>

<style lang="scss">
  .home-box {
    /* padding: 20px; */
    font-size: 14px;
    line-height: 24px;
    // background-color: #c0d8ec;
  }
</style>
