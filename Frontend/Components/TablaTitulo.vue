<template>
    <div id="titulo">
        <h2>{{titulo}}</h2>
        <div class="flex margin-left-auto cursor-pointer" @click="recargar">
            <img src="../assets/img/recargar.svg" class="width-40px margin-right-10" alt="">
            <h4 class=" margin-right-30">Refrescar</h4>
        </div>
        <h4 class="rainbow-box">Nuevo</h4>
    </div>
</template>


<script>
import '../assets/css/clasesUtiles.css'
import ReloadImg from '../assets/img/recargar.svg'

export default {
    data: () => {
        return{

        }
    },
    methods: {
        recargar: function(e){
            this.$emit('recargar', null);
        }
    },
    props:{
        titulo: String
    }
}
</script>



<style lang="scss" scoped>


#titulo{
    margin-bottom: 20px;
    padding: 0 20px;
    background-color: white;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 1px 20px -2px #dbdbdb;
}

</style>