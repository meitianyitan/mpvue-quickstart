<template>
  <div class="counter-warp">
    <p>Vuex counter： </p>
    <input type="text" class="form-control" v-model="count" placeholder="v-model" />
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <div>{{ city }}</div>
    <a @click="goHome" class="home">去往首页</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getSSQ } from '@/services/getData'

export default {
  data () {
    return {
      city: []
    }
  },
  computed: {
    ...mapState('counter', [
      'count'
    ])
  },
  methods: {
    ...mapActions('counter', ['increment', 'decrement', 'getSsq']),
    goHome () {
      const path = '/pages/index'
      const query = {
        test: '测试传参'
      }
      this.$router.push({ path, query, reLaunch: true })
      // this.$router.replace({ path, query }) 关闭当前页面，跳转到应用内的某个页面，相当于 wx.redirectTo，location 参数格式与 $router.push 相似，不支持 isTab 及 reLaunch 属性
      // this.$router.back() // 关闭当前页面，返回上一页面
      // this.$router.go(1) // 关闭当前页面，返回上一页面或多级页面，n 为回退层数，默认值为 1
    }
  },
  async onLoad () {
    // await 写法
    const res = await getSSQ({ code: 'ssq' })
    this.city = res.data.ssq[0].ddText
    console.log('接口返回的数据' + res.data.ssq[0].ddText)
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
