import Flyio from './interceptors'
import API from './api'
import Config from '@/config'
// 异常情况的错误处理
const errorFunction = (reqConfig, err) => {
  // 如果有异常需要提示
  if (!reqConfig.errorAction && reqConfig.isErrorDefaultTip) {
    setTimeout(() => {
      Config.resError.tipShow()
    }, 0)
  }
  throw (err)
}

let promises = [] // 接收接口请求的promise数组
let loadingTimer = [] // loading的定时器

const API_ENV = process.env.VUE_APP_API || 'local'
const apiUrl = {
  mcwp: {
    local: 'https://mp-test.zhudb.com/backend',
    dev: 'https://mp-test.zhudb.com/backend',
    pre: 'https://pre-test.zhudb.com/backend',
    prod: 'https://prod-test.zhudb.com/backend'
  }
}

// 接口请求封装函数
const flyRequest = (url = '', data = {}, flyConfig, defaultTipConfig = {}) => {
  const _url = apiUrl[url.split('.')[0]][API_ENV] + API[url]
  let flyio = Flyio.request(_url, data, {
    ...Config.flyConfig,
    ...flyConfig
  })
  let tipConfig = {
    ...Config.reqConfig,
    ...defaultTipConfig
  }

  // 开启loading
  clearTimeout(loadingTimer) // 多个接口时需要清除上一个loading
  loadingTimer = setTimeout(() => {
    tipConfig.isLoading && Config.loading.loadingShow()
  }, Config.loading.limitTime)

  // 计算当前的promise是否全部加载完成
  promises.push(flyio.catch(e => {}))
  Promise.all(promises).then(data => {
    if (data.length !== promises.length) return
    promises = [] // 所有请求完后清除promise数组
    clearTimeout(loadingTimer) // 当请求在xxxms内完成则直接清除loading计时器
  }).catch(() => {
    promises = [] // 请求异常完后清除promise数组
    clearTimeout(loadingTimer) // 请求异常则直接清除loading计时器
  })

  return flyio.then(res => {
    // 成功返回
    if (res[Config.resSuccess.key] === Config.resSuccess.value) {
      tipConfig.isLoading && Config.loading.loadingHide() // 当promise全部加载完成则隐藏loading
      return res
    } else {
      errorFunction(tipConfig, res)
    }
  }).catch(err => {
    errorFunction(tipConfig, err)
  })
}

export default {
  get: (url, data, flyConfig, defaultTipConfig) => flyRequest(url, data, {
    method: 'GET',
    ...flyConfig
  }, defaultTipConfig),
  put: (url, data, flyConfig, defaultTipConfig) => flyRequest(url, data, {
    method: 'PUT',
    ...flyConfig
  }, defaultTipConfig),
  post: (url, data, flyConfig, defaultTipConfig) => flyRequest(url, data, {
    method: 'POST',
    ...flyConfig
  }, defaultTipConfig),
  delete: (url, data, flyConfig, defaultTipConfig) => flyRequest(url, data, {
    method: 'DELETE',
    ...flyConfig
  }, defaultTipConfig)
}
