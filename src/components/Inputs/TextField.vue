<template>
<div class="field-wrapper">
    <label class="label-field">{{field.label}}</label>
    <input class="input-textfield" type="text" v-model="field.value" :placeholder="field.placeholder"  >
</div>
</template>
<script>
export default {
    props: ['fields'],
    data() {
        return { 
            field: this.fields
        }
    }
}
</script>
