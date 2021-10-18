<template>
  <div class="home"  ref="PokeComponent">
    <div class="container">
      <Filters @render="Rendering" />
    </div><br/>
   <strong v-if="pokemons">Items na pagina:  {{pokemons.length}}</strong>
   
   <div v-if="pagination" class="container">

     <Button v-if="currentpage  > 0" label="Anterior" style="marginTop: 10px; marginRight: 20px" @onclick="changePage(v = 'previous')"  />
     <Button  label="Proxima" style="marginTop: 10px" @onclick="changePage( v = 'next')"  />
   </div>

    <div class="container" v-if="pokemons">
      <CardPokemon v-lazy-container="{ selector: 'img' }" v-for="(pokemon, i) in pokemons.sort(function(a, b){return a-b})" :key="i" :pokeData="pokemon"/>
    </div>
    <div v-if="loading">
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
      pagination: true,
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
  async changePage(v) {
    this.payload.quantidade = this.AllPokemons.length
    console.log('v', v)
      if (v === 'previous') {
        this.payload.page = this.currentPage - this.payload.quantidade
          } 
      else if (v === 'next') { 
          this.payload.page = this.currentPage + this.payload.quantidade
          }
      await this.$store.commit('SET_CURRENT_PAGE', this.payload.page )
      await this.$store.dispatch('GetPokemon', this.payload)
    },

  async getMoreData() { 
    const de = 5
    this.payload.page = this.pokemons.length
    const ate = this.payload.page 
    await axios({ 
      url: `/pokemon?limit=${de}&offset=${ate}`,
      method: 'GET'
     }).then((res) => {
        const allpokemon = res.data 
        const pokemoon = this.pokemons
          allpokemon.results.forEach(function(pokemon){
        fetch(pokemon.url)
            .then(response => response.json())
            .then(function(pokeData){
              var index = pokemoon.findIndex(function (o) {
                return o.id === pokeData.id;
              });
              if (index === -1) 
                pokemoon.push(pokeData)
              
            })
         })
      this.loading = false
      })
  },
   async handleScroll () {
     if (!this.pagination) {
     this.loading = true
      // console.log("scroll", event)
      let element = this.$refs.PokeComponent
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        await this.getMoreData()
      }
    }
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
    this.$store.dispatch('GetPokemon', this.payload)
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
