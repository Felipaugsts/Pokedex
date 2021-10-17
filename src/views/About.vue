<template>
  <div class="about">
    <div class="poke-info" :style="`border: 1px solid ${color}`">
      <Button label="Voltar"  @onclick="voltar()" />
          <img class="img" :src="pokemon.url" />
    <h1 class="name-poke" :style="`color: ${color}`">{{pokemon.name}}</h1>
      <h3>HP: {{pokemon.hp.base_stat}} </h3>
      <h3>Atack: {{pokemon.attack.base_stat}}</h3>
      <h3>Defense: {{pokemon.defense.base_stat}} </h3>
      <h3>SpecialAttack : {{pokemon.specialAttack.base_stat}}</h3>
      <h3>SpecialDefense: {{pokemon.specialDefense.base_stat}}</h3>
      <h3>Speed: {{pokemon.speed.base_stat}}</h3>
    </div>
  </div>
</template>
<script>
import {PokemonCard} from '../../src/Mixins/PokeCardMixins';
import axios from 'axios'
export default {
  mixins: [PokemonCard],
  data() { 
    return { 
      id: this.$route.params.id,
      color: '',
      pokemon: []
    }
  },
  methods: {
      voltar() { 
      this.$router.push('/')
  }
  },
mounted() {
this.getcolor(this.id)
axios({
  url: `pokemon/${this.id}`,
  method: 'GET'
}).then((resp) => {
    const i = resp.data
        this.pokemon = {
          url: i.sprites.other.dream_world.front_default,
          id: i.id,
          type: i.types,
          name: i.name,
          hp: i.stats[0],
          attack: i.stats[1],
          defense: i.stats[2],
          specialAttack: i.stats[3],
          specialDefense: i.stats[4],
          speed: i.stats[5],
        };
        this.show = true;
      });
}
}
</script>
<style scoped>
.poke-info { 
  height: 60%;
  width: 60%;
  background: white;
  padding: 50px;
  border-radius: 20px;
}
.about { 
  height: 100vh;
  display: flex; 
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.name-poke {
  font-family: inter !important;
  color: black;
  font-size: 44px;
  text-transform: capitalize;
}
.img {
object-fit: scale-down;
  display: block;
  width: 100%;
  height: 200px;
}
</style>