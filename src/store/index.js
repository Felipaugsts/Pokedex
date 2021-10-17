import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Pokemons: null,
    filters: null
  },
  getters: {
    AllPokemons: (state) => state.Pokemons,
    filters: (state) => state.filters
  },
  mutations: {
    SET_NEW_LIMIT(state, PokeFiltered) { 
       state.Pokemons = PokeFiltered
      console.log('lenght', state.Pokemons)
    },
      SET_FILTER_NAME(state, payload) { 
      state.filters = payload.nome
      console.log('state filters', state.filters)
    },
    START_FILTERING(state) {
      state.loading = true

    }
  },
  actions: {
    GetPokemon({commit}, payload) { 
      commit('START_FILTERING')
      const filters = payload
      if (filters) {
            console.log('filters.quantidade', filters.quantidade)
      }
      axios({
        url: `/pokemon?limit=${filters !== null ? filters.quantidade : '5'}&offset=${filters !== null ? filters.quantidade * 2 : '10' }`,
        method: 'GET'
      }).then((res) => {
        const allpokemon = res.data 
        let AllPokemons = []
        console.log(allpokemon)
          allpokemon.results.forEach(function(pokemon){

        fetch(pokemon.url)
            .then(response => response.json())
            .then(function(pokeData){
              AllPokemons.push(pokeData)
            })
         })
         commit('SET_NEW_LIMIT', AllPokemons)
      })
    }
  },
  modules: {
  }
})
