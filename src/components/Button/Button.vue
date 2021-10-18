<template>
    <div class="field-wrapper">
        <button :class="disabled !== true ? 'button' : 'disabled'" type="button" :disabled="disabled" @click="clicked()">{{label}}</button>
    </div>
</template>
<script>
export default {
    props: ['label', 'disabled'],
    methods: {
        clicked() { 
            console.log("click")
            this.$emit('onclick')
        }
    },
}
</script>
<style scoped>
.button {
    cursor: pointer;
    background: #0077C8;
    color: white;
    padding: 10px;
    width: 100px;
    border-radius: 9px;
     font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0em;
}
.disabled { 
    cursor: pointer;
    padding: 10px;
    width: 100px;
    border-radius: 9px;
     font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0em;
}
</style>