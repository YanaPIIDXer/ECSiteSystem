import { createStore } from 'vuex'

const setRole = (state, role) => {
  sessionStorage.setItem("role", role);
  state.role = role;
}

export default createStore({
  state: {
    role: sessionStorage.getItem("role"),
  },
  getters: {
    isLogin: (state) => (state.role != ""),
    isUser: (state) => (state.role == "USER"),
    isAdmin: (state) => (state.role == "ADMIN"),
  },
  mutations: {
    loginAsUser: (state) => setRole(state, "USER"),
    loginAsAdmin: (state) => setRole(state, "ADMIN"),
    logout: (state) => setRole(state, ""),
  },
})
