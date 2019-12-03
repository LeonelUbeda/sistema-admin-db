<template>
    <div id="contenedor">
        
             <div class="width-100 padding-x-60 padding-y-20 absolute"  >
                <BusquedaInput></BusquedaInput>
                <Tabla :elementos="elementos" :titulos="titulos" ></Tabla>
                
                
            </div>
        
        
    </div>
</template>

<script>
import BusquedaTablaAll from './TemplateComponents/BusquedaTablaAll'
import Tabla from './Tabla'
import BusquedaInput from './BusquedaInput'
import axios from 'axios'

export default {
    props: {
        url: {
            type: String,
            default: '/api/vehiculos/versiones'
        },
        inputBusqueda: {
            type: String,
            default: 'modeloId'
        },
        titulos: {
            type: Array,
            default: ()=> [{propiedad: 'nombre', titulo: 'nommbre'}]
        }
    },
    data: ()=>{
        return{
              BusquedaTablaAllConfig:{
                tablaTitulos: [
                    {propiedad: 'nombre', titulo: 'Version'}   
                ],
                
                
            },
            tablaUrl: '/api/vehiculos/versiones',
            elementos: []   
        }
    },
    methods: {
        obtenerDatos: function() {
            let url = this.tablaUrl
            console.log(url)
            axios.get(url)
            .then(response =>{
                
                this.elementos = response.data
                console.log(response)
            } )
            .catch(err => console.log(err))

        }
    },
    created(){
        this.obtenerDatos()
    },
     components:{
        BusquedaTablaAll,
        Tabla,
        BusquedaInput
    }
   
}
</script>

<style lang="scss" scoped>



</style>