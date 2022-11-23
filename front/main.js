// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// // 引入自己写的组件
import LbsTabBar from "@/components/uni-tabbar/tabBar.vue"
Vue.component('LbsTabBar', LbsTabBar)

// 引入封装的axios包
import {$http} from './utils/wxAxios'
// 挂载到原型上
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://zsm.kknbb.cc:3090'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装弹窗展示函数
uni.$showPro = function(title = "数据请求失败〒▽〒", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
