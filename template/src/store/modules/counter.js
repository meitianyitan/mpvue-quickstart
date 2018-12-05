import { getSSQ } from '@/services/getData'
import * as types from '../mutation-types'

// 初始化 state
const state = {
  count: 0,
  ssq: ''
}

// getters
const getters = {
  ssq: state => state.ssq
}

// actions
const actions = {
  increment ({
    commit
  }) {
    commit('INCREMENT')
  },
  decrement ({
    commit
  }) {
    commit('DECREMENT')
  },
  async getSsq ({
    commit
  }, params = {}) {
    const res = await getSSQ(params)
    commit(types.GET_SSQ, res)
  }
}

// mutations
const mutations = {
  INCREMENT: (state) => {
    const obj = state
    obj.count += 1
  },
  DECREMENT: (state) => {
    const obj = state
    obj.count -= 1
  },
  [types.GET_SSQ] (state, res) {
    state.ssq = res.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
