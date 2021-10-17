<template>
    <div class="field-wrapper">
        <label class="label-field">{{field.label}}</label>
            <select  class="input-textfield" v-model="field.value">
            <option disabled value="">Selecione Quantidade</option>
            <option>{{field.option1}}</option>
            <option v-if="field.option2">{{field.option2}}</option>
            <option v-if="field.option3">{{field.option3}}</option>
            </select>
    </div>
</template>
<script>
export default {
    props: ['fields'],
    data() { 
        return { 
            field: this.fields,
        }
    }
}
</script>