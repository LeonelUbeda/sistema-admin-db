<template>
    <div class="flex items-center titulo">
        <h2 class="text-2xl">{{titulo}}</h2>
        <div class="flex margin-left-auto items-center cursor-pointer" @click="recargar">
            <img src="../assets/img/recargar.svg" class="width-20px margin-right-10" alt="">
            <h4 class="mr-30">Refrescar</h4>
        </div>
        <!--h4 class="rainbow-box">Crear</h4-->
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
.titulo{
    margin-bottom: 15px;
    height: 60px;
    padding: 0 20px;
    background-color: white;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 1px 20px -2px #dbdbdb;
}

</style>