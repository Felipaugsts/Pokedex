<template>
  <div class="home">
    <div class="container">
      <Filters @render="Rendering" />
      <!-- {{AllPokemons.length}} -->
    </div>
    {{FilterName}}
   <strong v-if="AllPokemons">Items na pagina:  {{AllPokemons.length}}</strong> <br/>
   <strong v-if="FilterName">Filtrando pelo nome:  {{FilterName}} </strong>

   <div v-if="pagination" class="container">
     <Button label="Anterior" style="marginTop: 10px" @onclick="previous()"  />
     <Button label="Proxima" style="marginTop: 10px" @onclick="next()"  />
   </div>

    <div class="container">
    <CardPokemon v-lazy-container="{ selector: 'img' }" v-for="(pokemon, i) in AllPokemons" :key="i" :pokeData="pokemon"/>
    </div>
</div>

</template>

<script>
// @ is an alias to /src
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
      payload: null,
      pagination: false
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
    previos() {
      console.log('previous page')
    },
    next() { 
      console.log('next page')
    }
  },  

  computed: {
  AllPokemons() {
    return this.$store.getters.AllPokemons
  },
  FilterName() {
    return this.$store.getters.filters
  }
  },
  mounted() {
    this.$store.dispatch('GetPokemon', this.payload)
  },
  watch: { 
    FilterName() { 
      if (this.FilterName) {
       const filtered = this.AllPokemons.filter((poke) => { 
          if (poke.name.toLowerCase().includes(this.FilterName.toLowerCase())) {
            this.filtered.push(poke)
            
          }
           
        })
            console.log('name', filtered)
      }
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
