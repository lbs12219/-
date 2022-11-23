<template>
  <view>
    <shopReg :shopRegBtn="shopRegBtn"></shopReg>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        shopRegBtn: true,
        // user : {}
      };
    },
    methods:{
      // initShopInfo(){
        // this.user = uni.getStorageSync('user')
        // console.log(this.user)
      // }
    },
    onLoad() {
      // this.initShopInfo()
    }
  }
</script>

<style lang="scss">

</style>
