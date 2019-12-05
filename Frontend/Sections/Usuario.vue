
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
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Crear Usuario'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Crear Usuario</h2>
                </div>
                <InputTemplate v-bind="configCrear" @elementoCreado="elementoCreado" ref="inputTemplateUsuario">
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
                encabezado:'Usuario',
                tablaTitulos: [
                    {propiedad: 'usuario', titulo: 'Usuario'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}, 
                    {propiedad: 'apellido', titulo: 'Apellido'},
                    {propiedad: 'rolId', titulo: 'Rol'},
                ],
                tituloPopup: {titulo: 'Editar usuario: ', propiedadElementoClickeado: 'apellido'},
                tablaUrl: '/api/usuarios/',
                tablaUrlEliminar: '/api/usuarios/',
                tablaUrlActualizar: '/api/usuarios/',
                tablaPropiedadAEliminar: 'usuario',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},{value: 'apellido', titulo: 'Apellido'},
                        {value: 'rolId', titulo: 'Rol ID'},{value: 'usuario', titulo: 'Usuario'}],
                tablaMandarEventoClick: false,
                mostrarInformacionClick: true,
                titulosClick: [
                    {propiedad: 'usuario', titulo: 'Usuario'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}
                ],
                busquedaDefault: 'usuario',
                mostrarOpcionEditar: true,
                mostrarOpcionEliminar: true,
                inputsEditar: [
                    [
                        {nombre: 'rolId', titulo: 'Rol ID', max: 99, tipo: 'number', validacion: true, uno: true, obligatorio: true, editable: false}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false},
                        {nombre: 'apellido', titulo: 'Apellido', max: 50, tipo: 'text', validacion: true, uno: false }
                    ],
                    [
                        {nombre: 'usuario', titulo: 'Usuario', max: 100, tipo: 'text', validacion: true, uno: false}
                    ]
                   
                ]
            },

            // Menu de arriba
            opciones: ['Buscar','Crear Usuario'],
            opcionSeleccionada: 'Buscar', 

         
            configCrear: {
                urlCrear: 'api/usuarios/',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [
                      {titulo: 'Usuario', nombre:'usuario', tipo:'text', max: 50, validacion: false, uno:false, obligatorio: true}
                  ],  
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:false, obligatorio: true},
                      {titulo: 'Apellido', nombre:'apellido', tipo:'text', max: 50 ,  validacion: false, uno:false}
                  ],
                  [
                      {
                            titulo: 'Rol', 
                            nombre:'rolId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/usuarios/',
                            editable: false,
                            foranea: {
                                url: 'api/roles',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'nombre', titulo: 'Nombre'},
                                  
                                ]
                            }
                      }
                  ],
                  [
                      {titulo: 'Contraseña', nombre:'contrasena', tipo:'password', max: 100, validacion: false, uno:false} 
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
            this.$refs.inputTemplateUsuario.borrarInputsData('')
            //this.opcionSeleccionada = 'Buscar'
        },
        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
        }
       
    },
    created(){
    
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