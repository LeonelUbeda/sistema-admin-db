<template>
    <div class="contenedor">
        <div id="contenedor-input" class="border-color-tema">
            <input v-on:keyup.enter="buscar" type="text" :placeholder="placeholder" v-model="busqueda">
            <div @click="buscar" id="lupa" class="bg-color-tema">
                <img src="../assets/img/lupa.svg" alt="">
            </div>
        </div>
    </div>
</template>



<script>

import '../assets/css/themeColors.css'

export default {
    data: () => {
        return {
            busqueda: '',

        }
    },
    props:{
        placeholder: String,
        inputTexto: String
    },
    methods:{
        buscar: function() {
        
            this.$emit('buscar', this.busqueda)
        },
        cambiarTexto: function(texto){
            this.busqueda = texto
            console.log('ssssss')
        }
    },
    mounted(){
        //this.busqueda = this.inputTexto
    }
}
</script>

<style lang="scss" scoped>
.contenedor{
    width: 100%;
    display: flex;
}
#contenedor-input{
    
    border-radius: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    input{
        padding-left: 20px;
        outline: none;
        height: 90%;
        width: 85%;
        border-radius: 40px;
        margin-right: 20px;
    }
}
#lupa{
    margin-left: auto ;
    
    border-radius: 30px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 25px;
    }
}
</style>