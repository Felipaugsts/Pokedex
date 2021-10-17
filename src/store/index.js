import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Pokemons: null
  },
  getters: {
    AllPokemons: (state) => state.Pokemons
  },
  mutations: {
    SET_ALL_POKEMON(state, payload) { 
      state.Pokemons = payload
    }
  },
  actions: {
    GetPokemon({commit}) { 
      axios({
        url: '/pokemon?limit=10&offset=20',
        method: 'GET'
      }).then((res) => {
        const allpokemon = res.data 
        let AllPokemons = []
        console.log(allpokemon)
          allpokemon.results.forEach(function(pokemon){
            console.log('p', pokemon.name)

        fetch(pokemon.url)
            .then(response => response.json())
            .then(function(pokeData){
              AllPokemons.push(pokeData)
            })
         })
         commit('SET_ALL_POKEMON', AllPokemons)
      })
    }
  },
  modules: {
  }
})
