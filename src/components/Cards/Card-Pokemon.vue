<template>
<div class="container-wrapper">
<div v-if="pokeData" class="poke-container" @click="Details(pokeData)">
  <img  :data-src="pokeData.sprites.other.dream_world.front_default"  class="poke-image">
  <div class="poke-title-wrapper">
    <div class="poke-title">{{pokeData.name}}</div>
  </div>
</div>#{{pokeData.id}}
<div v-if="pokeData" class="chips-wrapper">
<div v-for="(ab, i) in pokeData.abilities.slice(0, 2)" :key="i" class="chips" :style="`background: ${color}`">
  <span class="ability-text" :style="`color: ${color === 'white' || color === 'yellow' ? 'black' : 'white'}`">{{ab.ability.name}}</span>
</div>
</div>
</div>
</template>
<script>
import {PokemonCard} from '../../Mixins/PokeCardMixins'
export default {
  mixins: [PokemonCard],
  props: ['pokeData'],
  data() {
    return {
      color: ''
    }
},
methods: {
  Details(v) { 
    this.$router.push(`/about/${v.id}`)
  }
},
mounted() {
  const id = null
this.getcolor(id)
}
}
</script>
<style scoped>

.poke-image { 
  object-fit: scale-down;
  background: rgb(250, 248, 248);
  border-radius: 10px;
  opacity: 1;
  display: block;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
}

.poke-title { 
  font-family: inter !important;
  color: white;
  font-size: 26px;
  font-weight: 600;
  text-transform: capitalize;
}

.poke-container {
  position: relative;
  height: 320px; 
  width: 300px;
  min-width: 250px;
  background: var(color);
  /* border: 1px solid grey; */
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
   border-radius: 15px;
}
.container-wrapper{ 
  height: 400px; 
  width: 320px;
  margin: 10px;
  background: white
}
.chips  {
  padding: 2px;
  padding-right: 10px;
  padding-left: 10px;
  opacity: 0.3;
  height: 20px;
  min-width: 100px;
  border-radius: 10px;
  color:  black;
  margin: 5px;
}
.ability-text { 
  font-family: inter !important;
  font-weight: 600;
  text-transform: capitalize;
}
.chips-wrapper { 
  display: flex;
  justify-content: center;
}

.poke-title-wrapper {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  background: rgb(95, 86, 86);
  padding: 5px;
  border-radius: 8px; 
}

.poke-container:hover .poke-image {
  filter: brightness(30%);
-webkit-box-shadow: 0px 0px 13px 2px rgba(0,0,0,0.65); 
box-shadow: 0px 0px 13px 2px rgba(0,0,0,0.65);
}

.poke-container:hover .poke-title-wrapper {
  opacity: 1;
}
</style>