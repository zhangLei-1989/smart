import Vue
  from 'vue'
import Vuex
  from 'vuex'
import topBar
  from './modules/topBar'
import searchResult
  from './modules/searchResult'

import getters
  from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    topBar,
    searchResult
  },
  getters
})
