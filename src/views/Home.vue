<template>
  <div class="home">
    <div v-for="(pokemon, i) in AllPokemons" :key="i">
    <CardPokemon :pokeData="pokemon"/>
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
