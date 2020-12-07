<template>
    <v-text-field-simplemask 
    v-model="cmpValue"
    :label="label"
    :properties="{
        rules:[(value?rules.minLength((value.substr(2,1)=='9'?11:10),value):true)],
        type: 'tel'
    }"
    :options="{
    inputMask: maskTel(value),
    outputMask: '###########',
    empty:'',
    alphanumeric: false,
    }"
/>
</template>
<script>
import funcoes from '@/mixins/functions.js';
export default {
    mixins:[funcoes],
    model:{prop: 'value', event:'input'},
    props:['value','label'],
    computed:{
        cmpValue:{
            get:function(){
                if(this.value) return this.value
                else return '';
            },
            set:function(newValue){
                newValue = this.onlyNumber(newValue);
                this.$emit('input',newValue);
            }
        }
    },
}
</script>