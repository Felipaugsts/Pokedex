<template>
  <div class="home">
    <div class="container">
      <Filters @render="Rendering" />
    </div><br/>
   <strong v-if="AllPokemons">Items na pagina:  {{AllPokemons.length}}</strong>
   <div v-if="pagination" class="container">

     <Button v-if="currentpage  > 0" label="Anterior" style="marginTop: 10px; marginRight: 20px" @onclick="changePage(v = 'previous')"  />
     <Button  label="Proxima" style="marginTop: 10px" @onclick="changePage( v = 'next')"  />
   </div>

    <div class="container">
      <CardPokemon v-lazy-container="{ selector: 'img' }" v-for="(pokemon, i) in AllPokemons.sort(function(a, b){return a-b})" :key="i" :pokeData="pokemon"/>
    </div>
</div>

</template>

<script>
import CardPokemon from '@/components/Cards/Card-Pokemon.vue'
import Filters from '@/components/Pages/Pokemon-Filter.vue'
export default {
  name: 'Home',
  components: {
    CardPokemon,
    Filters
  },
  data() { 
    return {
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
      } else {
        this.pagination = false
      }
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
    }
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
    this.$store.dispatch('GetPokemon', this.payload)
  },
  watch: { 
    AllFilters() { 
      const quantidade = this.AllFilters.quantidade
      this.payload.quantidade = quantidade
    },

    currentpage() {
      this.currentPage = this.currentpage
    }
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
