import App from './App'
import store from './store/store.js'

// #ifndef VUE3
import Vue from 'vue'
import { $http } from '@escook/request-miniprogram'
Vue.config.productionTip = false
App.mpType = 'app'

uni.$http=$http
$http.baseUrl='https://www.uinav.com'
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中',
  })
  if(options.url.indexOf('/my/')!==-1){
    options.header={
      Authorization: store.state.m_user.token
    }
  }
}
$http.afterRequest=function(){
  uni.hideLoading()
}
// 封装展示消息提示的方法
uni.$showMsg=function(title='数据加载失败' , duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif