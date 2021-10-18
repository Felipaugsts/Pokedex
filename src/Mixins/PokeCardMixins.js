import axios from "axios";
export const PokemonCard = {

    methods: {
  getcolor(i) {
      var pokeid = null
      if (i !== null) {
          pokeid = i
      } 
      if (i === null) {
          pokeid = this.pokeData.id          
      }
axios({
    url:`/pokemon-species/${pokeid}/`,
    method: 'GET'
  }).then((res) => {
    this.color = res.data.color.name
  })
  },
    }
};