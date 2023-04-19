export default {
  // 开启命名空间
  namespaced: true,

  // 数据
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 登录成功后的token字符串
    token: uni.getStorageSync('token') || '',
    // 用户基本信息
    userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}'),
    redirectInfo:null
  }),

  // 方法
  mutations: {
    // 更新重定向的信息对象
    updateRedirectInfo(state,info){
      state.redirectInfo=info
    },
    // 更新token字符串
    updateToken(state,token){
      state.token=token
      this.commit('m_user/saveTokenStorage')
    },
    // 将token字符串持久化存储到本地
    saveTokenStorage(state){
      uni.setStorageSync('token',state.token)
    },
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address

      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储 address
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新用户基本信息
    updateUserInfo(state,userinfo){
      state.userinfo=userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    // 将userinfo持久化存储到本地
    saveUserInfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    }
  },
 // 数据包装器
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
