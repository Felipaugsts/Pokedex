import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Pokemons: null,
    filters: { 
        page: 0,
        quantidade: 10,

      },
      loader: false
  },
  getters: {
    AllPokemons: (state) => state.Pokemons,
    filters: (state) => state.filters,
    loading: (state) => state.loader,
    currentpage: (state) => state.filters.page
  },
  mutations: {

    SET_LOADER(state, i) {
      state.loader = i
    },

    SET_NEW_LIMIT(state, PokeFiltered) { 
       state.Pokemons = PokeFiltered
    },

    SET_CURRENT_PAGE(state, currentpage) { 
      state.filters.page = currentpage
    },
  },
})
