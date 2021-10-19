<template>
    <div class="filter-container">
<h2>Filter</h2>
<div class="wrapper-fields">
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
            QtdFilter: { 
                label: "Quantidade",
                value: '10',
                option1: 10,
                option2: 20,
                option3: 30  
            },
              Rendering: { 
                label: "Renderização",
                value: 'Fluído',
                option1: 'Paginado',
                option2: 'Fluído',
                
            },

        }
    },
    methods: {
                handleFilter() { 
                const filtereBy = { 
                    quantidade: this.QtdFilter.value
                }
                this.$emit('getPoke', filtereBy)
                this.$emit('render', this.Rendering.value)


        }
    },

}
</script>
<style scoped>
.filter-container { 
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 80%;
    height: auto;
    background: rgb(245, 243, 243);
    padding: 20px;
    border-radius: 15px;
}
.wrapper-fields { 
    display: flex;
    flex-wrap: wrap;
}
</style>