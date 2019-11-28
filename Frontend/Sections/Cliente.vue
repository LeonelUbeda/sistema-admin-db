
<template>

<div id="contenedor">

    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>

    <div class="width-100 padding-x-60 padding-y-20" v-if="opcionSeleccionada === 'Buscar'" >
        <BusquedaTablaAll v-bind="BusquedaTablaAllConfig" ></BusquedaTablaAll>
    </div>

    <div class="width-100 padding-x-60 padding-y-20" v-if="opcionSeleccionada === 'Crear Cliente'" >
        <div  class="titulo">
            <h2 class="text-2xl">Crear Cliente</h2>
        </div>
        <InputTemplate v-bind="configCrear">
        </InputTemplate>
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
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}, 
                    {propiedad: 'apellido', titulo: 'Apellido'}
                ],
                tablaUrl: '/api/clientes',
                tablaUrlEliminar: '/api/clientes',
                tablaPropiedadAEliminar: 'id',
                tablaMandarEventoClick: false,
                mostrarInformacionClick: true,
                titulosClick: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}
                ],
                mostrarOpcionEditar: true,
                mostrarOpcionEliminar: true,
                inputsEditar: [
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false},
                        {nombre: 'apellido', titulo: 'Apellido', max: 50, tipo: 'text', validacion: true, uno: false }
                    ],
                    [
                        {nombre: 'direccion', titulo: 'Direccion', max: 100, tipo: 'text', validacion: true, uno: false}
                    ],
                    [
                        {nombre: 'cedula', titulo: 'Número de cédula', max: 30, tipo: 'text', uno: false},
                        {titulo: 'Tipo de cliente', nombre:'tipoCliente', tipo:'text', max: 9999, validacion: false, valor:'', uno:false, 
                        opciones: ['Persona', 'Empresa']},
                    ]
                ]
            },

            // Menu de arriba
            opciones: ['Buscar','Crear Cliente'],
            opcionSeleccionada: 'Buscar', 

            // Configuracion de inputs para crear Clientes
            configCrear: {
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:false},
                      {titulo: 'Apellido', nombre:'apellido', tipo:'text', max: 50 ,  validacion: false, uno:false}
                  ],
                  [
                      {nombre: 'cedula', titulo: 'Número de cédula', max: 30, tipo: 'text', uno: true}
                  ],
                  [
                      {titulo: 'Dirección', nombre:'direccion', tipo:'text', max: 100, validacion: false, uno:false},
                      {titulo: 'Tipo de cliente', nombre:'tipoCliente', tipo:'text', max: 50, validacion: false, uno:false, 
                        opciones: ['Persona', 'Empresa']},
                       
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

        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
        }
       
    },
    created(){
    
    }
}
</script>



<style lang="scss" scoped>




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