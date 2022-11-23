<template>
  <view>
    <view @click="schoolChange">
      <van-field size="large" is-link readonly label="学校" placeholder="请选择您的学校" required :value="schoolValue" />
    </view>
    <!-- <van-action-sheet :show="schoolShow" :actions="schoolList" cancel-text="取消" @cancel="schoolCancel"
      @close="schoolClose" @select="schoolSelect" /> -->
    <view class="custom-box" v-if="schoolShow">
      <!-- <van-overlay show="true" bind:click="onClickHide"> -->
      <view class="slot-box" @click="schoolClose"></view>
      <view class="picker-box">
        <van-picker show="false" :columns="columns" show-toolbar title="请选择您的学校" @cancel="schoolClose"
          @confirm="schoolSelect" />
      </view>
      <!-- </van-overlay> -->
    </view>
    <view class="stu-login-sumbit" v-if="!isExist">
      <button @click="sumbitSchool" type="primary" :loading="btnLoad" plain="true">提交</button>
    </view>
    <view class="stu-login-sumbit" v-else>
      <button @click="sumbitSchool" type="primary" :loading="btnLoad" plain="true">修改</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        schoolValue: "",
        // schoolList: ["哈尔滨理工大学", "重庆大学", "黑龙江大学"],
        // schoolList: [{
        //   name: "哈尔滨理工大学"
        // }, {
        //   name: "重庆大学"
        // }, {
        //   name: "黑龙江大学"
        // }],
        schoolShow: false,
        btnLoad: false,
        columns: [{
          values: ["哈尔滨理工大学"],
          defaultIndex: 0
        }],
        user: {},
        isExist: false,
        mongoId: "",
        mongoSchool: "",
        schoolList:[]
      };
    },
    methods: {
      // 选择学校下拉框
      schoolSelect(e) {
        // console.log(e)
        this.schoolValue = e.detail.value[0]
        this.schoolShow = false
      },
      schoolChange() {
        this.schoolShow = true
      },
      schoolClose() {
        this.schoolShow = false
      },
      // 获取学校id
      getOwnShop(e){
        let mySchool = this.schoolList.filter((item) => {
          return item.schoolname == e
        })
        // console.log(mySchool)
        uni.$emit('ownShop', mySchool)
      },
      sumbitSchool() {
        let that = this
        if (this.schoolValue == "") {
          uni.$showPro('请选择学校!')
        } else if(this.schoolValue == this.mongoSchool){
          uni.$showPro('不能修改成相同的学校!')
        }else{
          let shelf = that
          if (that.isExist) {
            uni.$http.post('/user/changeStu', {
              mongoId: shelf.mongoId,
              stuSchool: shelf.schoolValue
            }).then((res) => {
              uni.$showPro('修改成功')
              // that.schoolValue = 
              shelf.getOwnShop('shelf.schoolValue')
            }).catch((err) => {
              console.log(err)
              uni.$showPro()
            })
          } else {
            uni.$http.post('/user/addStu', {
              stuOpenid: shelf.user.userOpenid,
              stuSchool: shelf.schoolValue
            }).then((res) => {
              uni.$showPro('提交成功')
              // that.schoolValue = 
              shelf.getOwnShop('shelf.schoolValue')
            }).catch((err) => {
              console.log(err)
              uni.$showPro()
            })
          }

        }
      },
      // 获取学校列表
      getAllSchool(){
        uni.$http.get('/user/getAllSchools').then((res)=>{
          let tem = res.data.map((item) => {
            return item.schoolname
          })
          // console.log(tem)
          this.schoolList = res.data
          this.columns[0].values = tem
        }).catch((err)=>{
          console.log(err)
          uni.$showPro()
        })
      },
      initStuInfo() {
        this.user = uni.getStorageSync('user')
        // console.log(this.user)
        this.getAllSchool()
        uni.$http.post('/user/selectStuId', {
          stuOpenid: this.user.userOpenid
        }).then((res) => {
          if (res.data != false) {
            // console.log(res.data)
            this.mongoId = res.data[0]._id
            this.mongoSchool = res.data[0].school
            this.schoolValue = this.mongoSchool
            this.isExist = true
            this.getOwnShop(this.schoolValue)
          }
        }).catch((err) => {
          console.log(err)
          uni.$showPro()
        })
      }
    },
    onLoad() {
      this.initStuInfo()
    }
  }
</script>

<style lang="scss">
  .stu-login-sumbit {
    width: 60%;
    margin: 0 auto;
    margin-top: 40rpx;
  }

  .custom-box {
    position: fixed;
    bottom: 0px;
    z-index: 99;
    width: 100%;
    height: 100%;

    .slot-box {
      background-color: var(--overlay-background-color, rgba(0, 0, 0, .7));
      width: 100%;
      height: 100%;
    }

    .picker-box {
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 600rpx;
    }
  }
</style>
