import { createStore } from 'vuex'

export default createStore({
  state: {
    role: "",
  },
  getters: {
    isLogin: (state) => (state.role != ""),
    isUser: (state) => (state.role == "USER"),
    isAdmin: (state) => (state.role == "ADMIN"),
  },
  mutations: {
    loginAsUser: (state) => (state.role = "USER"),
    loginAsAdmin: (state) => (state.role = "ADMIN"),
    logout: (state) => (state.role = ""),
  },
})
