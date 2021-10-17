<template>
<div class="poke-container" @click="Details(pokeData)">
  <img  :data-src="pokeData.sprites.other.dream_world.front_default"  class="poke-image" :style="`background: ${color}`">
  <div class="poke-title-wrapper">
    <div class="poke-title">{{pokeData.name}}</div>
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
  height: 400px; 
  width: 300px;
  min-width: 250px;
  background: var(color);
  /* border: 1px solid grey; */
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
   border-radius: 15px;
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