const searchResult = {
  state: {
    result: {
      name: '3131313'
    }
  },
  mutations: {
    SAVE_RESULT: (state, msg) => {
      state.result = msg
    }
  },
  actions: {
    saveResult ({ commit }, msg) {
      commit('SAVE_RESULT', msg)
    }
  }
}
export default searchResult
