<template>
    <div id="contenedor">
        
             <div class="width-100"  >
                <BusquedaInput @buscar="manejarBusqueda" ></BusquedaInput>
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
            default: ()=> [{propiedad: 'nombre', titulo: 'Nombre'}]
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
            elementos: [],
            textoBuscar: ''   
        }
    },
    methods: {
        obtenerDatos: function() {
            let params = {
                nombre: this.textoBuscar,

            }


            let url  = this.tablaUrl
            console.log(params)
            axios.get(url, {params})
            .then(response =>{
                
                this.elementos = response.data
                console.log(response)
            } )
            .catch(err => console.log(err))

        },
        manejarBusqueda: function(busqueda){
            this.textoBuscar = busqueda
            this.obtenerDatos()
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