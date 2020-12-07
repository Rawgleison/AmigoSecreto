<template>
    <v-dialog
        v-model="dialog" 
        persistent 
        max-width="500px"
        transition="dialog-transition"
    >
    <v-card>
        <v-card-title primary-title class="green">
            <p class="white--text text--lighten-1"> Gravado com Sucesso!!!! </p>
        </v-card-title>
        <v-card-text class="pa-10"> 
            <p>Parabéns você está participando do amigo secreto dos Pereiras.</p> 
            <p><v-icon>mdi-alert-outline</v-icon>E lembre-se, que esse ano o presente é de até R$70,00<v-icon>mdi-alert-outline</v-icon></p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" @click="dialog=false">OK</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:{
        value: Boolean,
    },
    computed:{
        dialog:{
            get:function(){
                return this.value;
            },
            set:function(val){
                this.$emit('input',val);
            }
        }
    }
}
</script>