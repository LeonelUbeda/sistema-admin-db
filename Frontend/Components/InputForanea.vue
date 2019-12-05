<template>
    <div id="contenedor">
        <div class="input-foraneo" @click="modoBusqueda(true)">
            <h2>{{mostrarValor}}</h2>
            
        </div>
        <!--input type="text" class="input-foraneo" v-model="display" >
        <h3 @click="modoBusqueda(true)">Buscar</h3-->
        <div class="width-100"  id="popup-container" v-show="mostrarPop == true">
            <div id="popup" class="">
                <div class="flex">
                    <h2 class="text-2xl">{{titulo}}</h2>
                    <BusquedaInput :placeholder="'Clic para buscar...'" 
                    @buscar="manejarBusqueda" class="ml-auto"
                    style="width: 350px"></BusquedaInput>
                </div>
                
                    <div class="divisor mt-3" style="width: 100%"></div>
               
                <Tabla :sombra="false" class="mt-6" :elementos="elementos" :titulos="propiedadesMostrarTabla" @filaSeleccionada="filaSeleccionada"></Tabla>
                <div class="flex width-100 justify-center">
                    <button  @click="modoBusqueda(false)" class="btn-rojo ml-auto">Cancelar</button>

                </div>
             
            </div>
        </div>
        
        
    </div>
</template>

<script>

import Tabla from './Tabla'
import BusquedaInput from './BusquedaInput'
import axios from 'axios'

export default {
    props: {
        mostrar: {
            type: String | Number,
            default: 'Clic para buscar...'
        },
        value: String | Number,
        url: String /*'/api/vehiculos/modelos'*/,
        buscarPor: String /*'nombre'*/,
        insertarPropiedad: String/*'id'*/,
        mostrarPropiedad: String,
        titulo: {
            type: String,
            default: 'Busqueda'
        },
        propiedadesMostrarTabla: {
            type: Array,
            default: () => [{propiedad: 'nombre', titulo: 'Nombre'}]
        },

        
    },
    data: ()=>{
        return{
        
            mostrarValor: '', // Lo que muestro al usuario, value es el valor que se utiliza para mandar al server
            mostrarPop: false,
            elementos: [],
            textoBuscar: ''   
        }
    },
    methods: {
        filaSeleccionada: function(elemento){
           
            this.mostrarValor = elemento[this.mostrarPropiedad]

            this.$emit('input', elemento[this.insertarPropiedad])
            this.mostrarPop = false

        },
        modoBusqueda: function(toggle){
            this.mostrarPop = toggle
        },
        obtenerDatos: function() {
            let params = {
                [this.buscarPor]: this.textoBuscar,
            }
            let url  = this.url
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

        if(this.value == null || this.value == ''){
            this.mostrarValor = 'Clic para buscar...'
        }else{
            this.mostrarValor = this.mostrar
        }
        console.log(this.mostrar)
    },
    computed:{
        displayShow: function(){
            return this.mostrarValor
            
        }
    },
    watch: {
        mostrar: function(valor){
            this.mostrarValor = valor
            console.log(valor, 'hey')
        }
    },
    components:{
        Tabla,
        BusquedaInput
    }
   
}
</script>

<style lang="scss" scoped>

.input-foraneo{
    cursor: pointer;
}

input, select, .input-foraneo {
	margin:10px 0 15px 0;
	padding:5px 10px;
	width:100%;
	outline:none;
	border:1px solid rgb(77, 161, 77);
    background-color: white;
	border-radius:20px;
	display:inline-block;
	-webkit-box-sizing:border-box;
	   -moz-box-sizing:border-box;
	        box-sizing:border-box;
    -webkit-transition:0.2s ease all;
	   -moz-transition:0.2s ease all;
	    -ms-transition:0.2s ease all;
	     -o-transition:0.2s ease all;
	        transition:0.2s ease all;
}
#popup-container{
    width: 100vw;
    height: 100vh;;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($color: #B7B7B7, $alpha: 0.5);
    //background-color: #B7B7B7;

}

#popup{
    border-radius: 10px;
    opacity: 1;
    width: 700px;
    max-height: calc(100% - 100px);
    top: 50px;
    left: calc(50% - (700px / 2) );
    z-index: 20;
    position: fixed;
    overflow-y: auto;
    background-color: white;
    padding: 30px 30px 20px 30px;
  
}   
</style>