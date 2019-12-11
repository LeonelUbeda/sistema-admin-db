
<template>
    <div>
            
            <h1>Bienvenido {{$store.state.Usuario.nombre}}</h1>
            
            {{this.$store.state.Permisos}}
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