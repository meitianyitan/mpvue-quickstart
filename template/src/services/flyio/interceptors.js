import Fly from 'flyio'
import Vue from 'vue'
const request = new Fly()

request.interceptors.request.use((request) => {
  request.headers['Authorization'] = wx.getStorageSync(Vue.iGbal.vars.token) || ''
  request.headers['content-type'] = 'application/x-www-form-urlencoded'
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    // 获取 Authorization
    wx.setStorageSync(Vue.iGbal.vars.token, response.headers.Authorization)
    return promise.resolve(response.data)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)
export default request
