
<template>

<div id="contenedor">

    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>
    <div class="width-100 relative" >
        <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Buscar'" >
                <BusquedaTablaAll v-bind="BusquedaTablaAllConfig" ></BusquedaTablaAll>
            </div>
        </transition>
        <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Crear Cliente'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Crear Cliente</h2>
                </div>
                <InputTemplate v-bind="configCrear" @elementoCreado="elementoCreado" ref="inputTemplateCliente">
                </InputTemplate>
            </div>
        </transition>
    </div>

   
</div>

</template>

<script>

import clasesUtilesCSS from '../assets/css/clasesUtiles'
import axios from 'axios'
import 'babel-polyfill'

/* ----- Componentes  ----- */
import TopSection from '../Components/TopSection'
import Tabla from '../Components/Tabla'
import TablaTitulo from '../Components/TablaTitulo'
import InputTemplate from '../Components/InputTemplate'
import BusquedaInput from '../Components/BusquedaInput.vue'
import BusquedaRadio from '../Components/BusquedaRadio.vue'
import BusquedaTablaAll from '../Components/TemplateComponents/BusquedaTablaAll'
export default {
    data: () => {
        return {
            BusquedaTablaAllConfig:{
                encabezado:'Clientes',
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}, 
                    {propiedad: 'apellido', titulo: 'Apellido'},
                    {propiedad: 'tipoCliente', titulo: 'Tipo'},
                ],
                tablaUrl: '/api/clientes',
                tablaUrlEliminar: '/api/clientes',
                tablaUrlActualizar: '/api/clientes',
                tablaPropiedadAEliminar: 'id',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},{value: 'apellido', titulo: 'Apellido'},
                        {value: 'direccion', titulo: 'Direccion'},{value: 'id', titulo: 'ID'}],
                tablaMandarEventoClick: false,
                mostrarInformacionClick: true,
                titulosClick: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'cedula', titulo: 'Cédula'}
                ],
                busquedaDefault: 'nombre',
                mostrarOpcionEditar: false,
                mostrarOpcionEliminar: false,
                inputsEditar: [
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: true, editable: false}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false},
                        {nombre: 'apellido', titulo: 'Apellido', max: 50, tipo: 'text', validacion: true, uno: false }
                    ],
                    [
                        {nombre: 'direccion', titulo: 'Direccion', max: 100, tipo: 'text', validacion: true, uno: false}
                    ],
                    [
                        {nombre: 'cedula', titulo: 'Número de cédula', max: 30, tipo: 'text', uno: false, editable:true},
                        {titulo: 'Tipo de cliente', nombre:'tipoCliente', tipo:'text', max: 9999, validacion: false, valor:'', uno:true, 
                        opciones: ['Persona', 'Empresa'], obligatorio: true},
                    ]
                ]
            },

            // Menu de arriba
            opciones: [],
            opcionSeleccionada: 'Buscar', 

            // Configuracion de inputs para crear Clientes
            configCrear: {
                urlCrear: 'api/clientes',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:false, obligatorio: true},
                      {titulo: 'Apellido', nombre:'apellido', tipo:'text', max: 50 ,  validacion: false, uno:false}
                  ],
                  [
                      {nombre: 'cedula', titulo: 'Número de cédula', max: 30, tipo: 'text', uno: true}
                  ],
                  [
                      {titulo: 'Dirección', nombre:'direccion', tipo:'text', max: 100, validacion: false, uno:false},
                      {titulo: 'Tipo de cliente', nombre:'tipoCliente', tipo:'text', max: 50, validacion: false, uno:false, 
                        opciones: ['Persona', 'Empresa'] , obligatorio: true},
                       
                  ]
                  
                ]  
            }
     

        }
    },
    components:{
        TopSection,
        Tabla,
        TablaTitulo,
        InputTemplate,
        BusquedaInput,
        BusquedaRadio,
        BusquedaTablaAll
    },
    methods: {
        elementoCreado: function(){
            this.$refs.inputTemplateCliente.borrarInputsData('')
            //this.opcionSeleccionada = 'Buscar'
        },
        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
        }
       
    },
    created(){

        /* ------------- PERMISOS DE LA SECCION ------------- */
        // Si el usuario tiene permisos en Clientes, entonces...
        if(this.$store.state.Permisos.hasOwnProperty('Clientes')){
            switch (this.$store.state.Permisos.Clientes) {
                case 4:
                    this.BusquedaTablaAllConfig.mostrarOpcionEliminar = true
                case 3: 
                    this.BusquedaTablaAllConfig.mostrarOpcionEditar = true
                case 2:
                    this.opciones.push('Crear Cliente')
                case 1:
                    this.opciones.push('Buscar')
                case 0:
                    break;
                default:
                    break
            }
        }
        if(this.$store.state.Permisos.hasOwnProperty('admin')){
            this.BusquedaTablaAllConfig.mostrarOpcionEditar = true
            this.BusquedaTablaAllConfig.mostrarOpcionEliminar = true;
            this.opciones.push('Crear Cliente')
            this.opciones.push('Buscar')
        }
    }
}
</script>



<style lang="scss" scoped>



.v-leave { opacity: 1; }
.v-leave-active { transition: opacity 0.7s }
.v-leave-to { opacity: 0; }
.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 0.7s}
.v-enter-to { opacity: 1; }

/*

.slide-enter-active {
   
   transition-duration: 1s;
   transition-timing-function: linear;
}

.slide-leave-active {
   transition-duration: 1s;

   transition-timing-function: linear;
}

.slide-enter-to, .slide-leave {
   max-height: 800px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
    max-height: 0px;
   overflow: hidden;
}

*/

#sidebar{
    width: 25%;
    height: 200px;
    
}

#main{
    padding: 20px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.contenedor-tabla{
    

    width: 70%;
}


</style>