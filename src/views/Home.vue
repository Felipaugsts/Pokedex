<template>
  <div class="home">
    <div class="container">
    <CardPokemon v-lazy-container="{ selector: 'img' }" v-for="(pokemon, i) in AllPokemons" :key="i" :pokeData="pokemon"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardPokemon from '@/components/Card-Pokemon.vue'

export default {
  name: 'Home',
  components: {
    CardPokemon
  },
  computed: {
  AllPokemons() {
    return this.$store.getters.AllPokemons
  }
  },
  mounted() {
    this.$store.dispatch('GetPokemon')
  },
  watch: {
    AllPokemons() {
      console.log('state,', this.AllPokemons)
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
