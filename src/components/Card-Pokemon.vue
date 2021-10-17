<template>
  <div class="poke-container" :style="`background: ${color}`">
    <img class="poke-image" :src="pokeData.sprites.other.dream_world.front_default" />
    <p class="poke-title">{{pokeData.name}}</p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['pokeData'],
  data() {
    return {
      color: ''
    }
},
methods: {
  getcolor() {
      axios({
    url:`/pokemon-species/${this.pokeData.id}/`,
    method: 'GET'
  }).then((res) => {
    this.color = res.data.color.name
  })
  }
},
mounted() {
this.getcolor()
}
}
</script>
<style scoped>
.poke-container { 
  height: 400px; 
  width: 300px;
  background: var(color);
  border: 1px solid grey;
  border-radius: 8px;
}
.poke-image { 
height: 300px;
width: 200px;
object-fit: scale-down;
}
.poke-title { 
  font-family: inter !important;
  color: white;
  font-size: 26px;
  font-weight: 600;
/* text-transform: capitalize; */
}
</style>