// iGbalPlugin
import utils from './utils'

export default {
  /**
   * 自定义方法
   * 组件内使用： this.$iGbal.*
   * 全局使用：Vue.iGbal.*
   */
  install (Vue) {
    const gbal = {
      ...utils
    }

    Vue.iGbal = gbal
    Vue.prototype.$iGbal = gbal
  }
}
