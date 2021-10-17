<template>
    <div class="filter-container">
<h2>Filter</h2>
<div class="wrapper-fields">
<TextField :fields="NameFilter" style="marginRight: 20px"  />
<SelectField :fields="Rendering" style="marginRight: 20px"  />
<SelectField :fields="QtdFilter" style="marginRight: 20px"  />
<Button label="Buscar" style="marginTop: 10px" @onclick="handleFilter"  />
</div>
    </div>
</template>
<script>
export default {
    data() { 
        return { 
            NameFilter: { 
                label: 'Buscar',
                value: ''
            },
            QtdFilter: { 
                label: "Quantidade",
                value: '',
                option1: 10,
                option2: 20,
                option3: 30  
            },
              Rendering: { 
                label: "Renderização",
                value: '',
                option1: 'Paginado',
                option2: 'Fluído',
                
            },

        }
    },
    methods: {
                handleFilter() { 
                const filtereBy = { 
                    nome: this.NameFilter.value,
                    quantidade: this.QtdFilter.value
                }
                this.$store.dispatch('GetPokemon', filtereBy)
                this.$store.commit('SET_FILTER_NAME', filtereBy)
                this.$emit('render', this.Rendering.value)


        }
    },
}
</script>
<style scoped>
.filter-container { 
    width: 80%;
    height: auto;
    background: rgb(245, 243, 243);
    padding: 20px;
    border-radius: 15px;
}
.wrapper-fields { 
    display: flex;
}
</style>