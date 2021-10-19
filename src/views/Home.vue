<template>
  <div class="home"  ref="PokeComponent">
    <div class="container">
      <Filters @render="Rendering" @getPoke="GetPokemon" />
    </div><br/>
   <span>Items na pagina:  <strong v-if="pokemons.length > 9">{{pokemons.length}}</strong></span>

   <div v-if="pagination" class="container">

     <Button v-if="currentpage  > 0" label="Anterior" style="marginTop: 10px; marginRight: 20px" @onclick="changePage(v = 'previous')"  />
     <Button  label="Proxima" style="marginTop: 10px" @onclick="changePage( v = 'next')"  />
   </div>
  
    <!-- <div class="container" v-if="pokemons.length < 9">
        <Skeleton v-for="(load, i) in 10" :key="i" />
    </div> -->
    <div class="container" v-if="pokemons">
      <CardPokemon v-lazy-container="{ selector: 'img' }" v-for="(pokemon, i) in pokemons.sort(function(a, b){return a-b})" :key="i" :pokeData="pokemon"/>
    </div>
    <div v-if="loading && !pagination">
      <h3>.... Loading </h3>
    </div>
</div>

</template>

<script>
import CardPokemon from '@/components/Cards/Card-Pokemon.vue'
import Filters from '@/components/Pages/Pokemon-Filter.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    CardPokemon,
    Filters
  },
  data() { 
    return {
      pokemons: [],
      loading: false,
      payload: { 
        page: 0,
        quantidade: 10,
      },
      pagination: false,
      currentPage: 0,
    }
  },
  methods: {
 Rendering(v) { 
      if (v === 'Paginado') {
        this.pagination = true
      } else if (v === 'Fluído') {
        this.pagination = false
      }
              console.log('tpagi', this.pagination)
    },

 changePage(v) {
    this.payload.quantidade = this.AllPokemons.length
    console.log('v', v)
      if (v === 'previous') {
        this.payload.page = this.currentPage - this.payload.quantidade
          } 
      else if (v === 'next') { 
          this.payload.page = this.currentPage + this.payload.quantidade
          }
      this.$store.commit('SET_CURRENT_PAGE', this.payload.page )
      this.GetPokemon(this.payload)
    },

 handleScroll () {
     if (!this.pagination) {
     this.loading = true
      // console.log("scroll", event)
      let element = this.$refs.PokeComponent
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        const payload = {   
          quantidade : 10,
          page: this.payload.page,
          tipo: 'getmoredata'
        }
       this.GetPokemon(payload)
      }
    }
   },

 GetPokemon( payload) { 
        const commit = this.$store.commit
      if (!payload.tipo) { // IF IS NOT INFINITE LOAD
      if (payload) {
            if (payload.page) {
              this.$store.commit('SET_CURRENT_PAGE', payload.page )
            }
      } else { 
        commit('SET_CURRENT_PAGE', 0 )
      }
    } else {               // IF IT IS INFINITE LOAD
      payload.page = this.payload.page = this.pokemons.length
    }
      axios({
        url: `/pokemon?limit=${payload.quantidade !== null ? payload.quantidade : '2'}&offset=${payload.page !== null ? payload.page : '0' }`,
        method: 'GET'
      }).then((res) => {
        const allpokemon = res.data 
        let AllPokemons = []
        let pokemoon = this.pokemons
          allpokemon.results.forEach(function(pokemon){

        fetch(pokemon.url)
            .then(response => response.json())
            .then(function(pokeData){
              if (payload.tipo) { // IF IT IS INFINITE LOAD
                var index = pokemoon.findIndex(function (o) {
                  
                return o.id === pokeData.id;
              });
              if (index === -1) 
                pokemoon.push(pokeData)
              } else {  // IF IS NOT INFINITE LOAD
                AllPokemons.push(pokeData)
              }
            })
         })
         if (!payload.tipo) { // IF IS NOT INFINITE LOAD
         commit('SET_NEW_LIMIT', AllPokemons)
         setTimeout(function(){
          commit('SET_LOADER', false)}, 1500);
         }
      })
    }
  },

 created () {
      window.addEventListener('scroll', this.handleScroll);

  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
  AllPokemons() {
    return this.$store.getters.AllPokemons
  },
  AllFilters() {
    return this.$store.getters.filters
  },
  currentpage() {
    return this.$store.getters.currentpage
  }
  },
  mounted() {
    this.$store.commit('SET_LOADER', true)
    this.GetPokemon(this.payload)
  },
  watch: { 
    AllFilters() { 
      const quantidade = this.AllFilters.quantidade
      this.payload.quantidade = quantidade
    },

    currentpage() {
      this.currentPage = this.currentpage
    },
    AllPokemons() { 
      this.pokemons = this.AllPokemons
    },
  }
}
</script>
<style scoped>
.container { 
  display: flex;
 flex-wrap: wrap;
 justify-content: center;
}

</style>
