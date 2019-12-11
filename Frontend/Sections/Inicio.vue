
<template>
    <div>
        <div class="titulo">
            <h1>Bienvenido {{$store.state.Usuario.nombre}}</h1>
        </div>
        <div class="width-100 flex justify-center">
            <h1>Sistema de gestión de taller</h1>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
import 'babel-polyfill'
import TopSection from '../Components/TopSection'
export default {
    data: () => {
        return{
            nombre: 'Holi',
            cliente: Array,
            prueba: ''
        }
    },
    methods:{
        
    },
    
    components:{

    }
}
</script>


<style lang="scss" scoped>


</style>