import { createStore } from 'vuex'

const setData = (state, name, role) => {
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("role", role);
  state.name = name;
  state.role = role;
}

export default createStore({
  state: {
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  },
  getters: {
    name: (state) => state.name,
    isLogin: (state) => (state.role != ""),
    isUser: (state) => (state.role == "USER"),
    isAdmin: (state) => (state.role == "ADMIN"),
  },
  mutations: {
    loginAsUser: (state, name) => setData(state, name, "USER"),
    loginAsAdmin: (state) => setData(state, "admin", "ADMIN"),
    logout: (state) => setData(state, "", ""),
  },
})
