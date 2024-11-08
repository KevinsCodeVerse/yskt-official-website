import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: localStorage.getItem("account")
  },
  getters: {
    account: (state) => {
      return state.account
    }
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      console.log(account);
      state.account = account
      localStorage.setItem("account", account);
    },
    LAYOUT_USER: (state) => {
      state.account = ""
      localStorage.clear()
    }
  },
  actions: {
  },
  modules: {
  }
})
