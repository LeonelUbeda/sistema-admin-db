<template>
    <div id="contenedor">
        <TopSection 
        :opciones="opciones"
        :opcionSeleccionada="opcionSeleccionada"
        @elementoSeleccionado="clickOpciones">
        </TopSection>
        <div class="width-100 relative" >
            <transition  mode="out-in">
                <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Buscar Servicio'" >
                    <BusquedaTablaAll v-bind="BusquedaTablaAllConfigServ" ></BusquedaTablaAll>
                </div>
            </transition>
            <transition  mode="out-in">
                <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Añadir Servicio'" >
                    <div  class="titulo">
                        <h2 class="text-2xl">Añadir Servicio</h2>
                    </div>
                    <InputTemplate v-bind="configCrearServicio" @elementoCreado="elementoCreado" ref="inputTemplateCliente">
                    </InputTemplate>
                </div>
            </transition>
            <transition  mode="out-in">
                <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Buscar Categoria'" >
                    <BusquedaTablaAll v-bind="BusquedaTablaAllConfigCateg" ></BusquedaTablaAll>
                </div>
            </transition>
            <transition  mode="out-in">
                <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Añadir Categoria'" >
                    <div  class="titulo">
                        <h2 class="text-2xl">Añadir Categoria </h2>
                    </div>
                    <InputTemplate v-bind="configCrearCategoria" @elementoCreado="elementoCreado" ref="inputTemplateCliente">
                    </InputTemplate>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

import BusquedaTablaAll from '../Components/TemplateComponents/BusquedaTablaAll'
import TopSection from '../Components/TopSection'
import InputTemplate from '../Components/InputTemplate'
import InputForanea from '../Components/InputForanea'
import BusquedaInput from '../Components/BusquedaInput.vue'
import BusquedaRadio from '../Components/BusquedaRadio.vue'
import Tabla from '../Components/Tabla'
import TablaTitulo from '../Components/TablaTitulo'

export default {
    data: () =>{
        return{
            BusquedaTablaAllConfigServ:{
                encabezado: 'Servicios',
                tituloPopup: {titulo: 'Editar Servicio: ', propiedadElementoClickeado: 'nombre'},
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'categoriaId', titulo: 'Categoria'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'},
                    {propiedad: 'descripcion', titulo: 'Descripcion'},
                ],
                tablaUrl: '/api/servicios',
                tablaUrlEliminar: '/api/servicios',
                tablaUrlActualizar: '/api/servicios',
                tablaPropiedadAEliminar: 'id',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},{value: 'categoriaId', titulo: 'Categoria'},
                        {value: 'id', titulo: 'ID'}],
                tablaMandarEventoClick: false,
                mostrarInformacionClick: true,
                titulosClick: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}
                ],
                busquedaDefault: 'nombre',
                mostrarOpcionEditar: false,
                mostrarOpcionEliminar: false,
                inputsEditar: [
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: true, editable: false},
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false, obligatorio: true}
                    ],
                    [
                        {nombre: 'categoriaId', titulo: 'Categoria', max: 99, tipo: 'number', validacion:true, uno: true, editable:true, obligatorio: true},
                        {nombre:'descripcion', titulo: 'Descripcion', tipo:'text', max: 200, validacion: false, valor:'', uno:false},
                    ]
                ]
            },
            BusquedaTablaAllConfigCateg:{
                encabezado: 'Categorias',
                tituloPopup: {titulo: 'Editar Categoria: ', propiedadElementoClickeado: 'nombre'},
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}
                ],
                tablaUrl: '/api/servicios/categorias',
                tablaUrlEliminar: '/api/servicios/categorias',
                tablaUrlActualizar: '/api/servicios/categorias',
                tablaPropiedadAEliminar: 'id',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},
                        {value: 'id', titulo: 'ID'}],
                tablaMandarEventoClick: false,
                mostrarInformacionClick: true,
                titulosClick: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}
                ],
                busquedaDefault: 'nombre',
                mostrarOpcionEditar: false,
                mostrarOpcionEliminar: false,
                inputsEditar: [
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: true, editable: false},
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false, obligatorio: true}
                    ]
                ]
            },
            //opciones: ['Buscar Servicio', 'Añadir Servicio', 'Buscar Categoria','Añadir Categoria'],
            opciones: ['Buscar Servicio', 'Buscar Categoria'],
            opcionSeleccionada: 'Buscar Servicio',
            // Configuracion de inputs para crear Servicio
            configCrearServicio: {
                urlCrear: 'api/servicios',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:false, obligatorio: true},
                      {
                           titulo: 'Categoria', 
                            nombre:'categoriaId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/servicios/categorias',
                            editable: false,
                            foranea: {
                                urlBuscar: '/api/servicios/categorias',
                                propiedadElementoBuscar: 'id',
                                propiedadMostrarResultado: 'nombre',
                                url: '/api/servicios/categorias',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'id', titulo: 'id Rol'},
                                    {propiedad: 'nombre', titulo: 'Nombre'},
                                  
                                ]
                            }
                      }
                  ],
                  [
                      {titulo: 'Descripcion', nombre:'descripcion', tipo:'text', max: 200, validacion: false, uno:false}
                       
                  ]
                  
                ]  
            },
            //Config para crear Categoria
            configCrearCategoria: {
                urlCrear: 'api/servicios/categorias',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:true, obligatorio: true}
                  ]
                  
                ]  
            }
        }
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
    components:{
        BusquedaTablaAll,
        TopSection,
        InputTemplate
    },
    created(){
           if(this.$store.state.Permisos.hasOwnProperty('Servicios')){
            switch (this.$store.state.Permisos.Servicios) {
                case 4:
                    this.BusquedaTablaAllConfigServ.mostrarOpcionEliminar = true
                    this.BusquedaTablaAllConfigCateg.mostrarOpcionEliminar = true
                case 3: 
                    this.BusquedaTablaAllConfigServ.mostrarOpcionEditar = true
                    this.BusquedaTablaAllConfigCateg.mostrarOpcionEditar = true
                case 2:
                    this.opciones.push('Añadir Servicio')
                    this.opciones.push('Añadir Categoria')
                case 1:
                   //this.opciones.push('Buscar Servicio')
                   //this.opciones.push('Buscar Categoria')
                case 0:
                    break;
                default:
                    break
            }
        }
        if(this.$store.state.Permisos.hasOwnProperty('admin')){
            this.BusquedaTablaAllConfigServ.mostrarOpcionEditar = true
            this.BusquedaTablaAllConfigServ.mostrarOpcionEliminar = true;
            this.BusquedaTablaAllConfigCateg.mostrarOpcionEditar = true;
            this.BusquedaTablaAllConfigCateg.mostrarOpcionEliminar = true;
            this.opciones.push('Añadir Servicio', 'Añadir Categoria')
           
        }
    }
}
</script>

<style scoped>

</style>