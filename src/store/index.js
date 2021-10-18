import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
      console.log('lenght', state.Pokemons)
    },

    START_FILTERING(state) {
      state.loading = true
    },

    SET_CURRENT_PAGE(state, currentpage) { 
      state.filters.page = currentpage
      console.log("state page", state.filters.page)
    },
  },
  actions: {
    GetPokemon({commit}, payload) { 
      commit('START_FILTERING')
      const filters = payload
      if (filters) {
            if (filters.page) {
              commit('SET_CURRENT_PAGE', filters.page )
            }
      } else { 
        commit('SET_CURRENT_PAGE', 0 )
      }
      axios({
        url: `/pokemon?limit=${filters.quantidade !== null ? filters.quantidade : '2'}&offset=${filters.page !== null ? filters.page : '0' }`,
        method: 'GET'
      }).then((res) => {
        const allpokemon = res.data 
        let AllPokemons = []
          allpokemon.results.forEach(function(pokemon){

        fetch(pokemon.url)
            .then(response => response.json())
            .then(function(pokeData){
              AllPokemons.push(pokeData)
            })
         })
         commit('SET_NEW_LIMIT', AllPokemons)
         setTimeout(function(){
                    commit('SET_LOADER', false)
                }, 1500);
         
         
      })
    }
  },
})
