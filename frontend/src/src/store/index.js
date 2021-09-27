import { createStore } from 'vuex'

export default createStore({
  state: {
    role: "",
  },
  getters: {
    isLogin: (state) => (state.role != ""),
    isAdmin: (state) => (state.role != "ADMIN"),
  },
  mutations: {
    loginAsUser: (state) => (state.role = "USER"),
    loginAsAdmin: (state) => (state.role = "ADMIN"),
    logout: (state) => (state.role = ""),
  },
})
