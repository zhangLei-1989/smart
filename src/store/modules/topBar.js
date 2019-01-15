const topBar = {
  state: {
    tabIsFixed: false,
    buttonShow: false
  },
  mutations: {
    TOGGLE_TOP_FIXED: (state, status) => {
      state.tabIsFixed = status
    },
    TOGGLE_BUTTON_STATUS: (state, status) => {
      state.buttonShow = status
    }
  },
  actions: {
    toggleTopFixed ({ commit }, status) {
      commit('TOGGLE_TOP_FIXED', status)
    },
    toggleBtnFixed ({ commit }, status) {
      commit('TOGGLE_BUTTON_STATUS', status)
    }
  }
}
export default topBar
