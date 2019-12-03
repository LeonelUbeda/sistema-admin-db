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
                <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Añadir Servicio'" >
                    <div  class="titulo">
                        <h2 class="text-2xl">Añadir Servicio</h2>
                    </div>
                    <InputTemplate v-bind="configCrear" @elementoCreado="elementoCreado" ref="inputTemplateCliente">
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

export default {
    data: () =>{
        return{
            BusquedaTablaAllConfig:{
                encabezado: 'Servicios',
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
                mostrarOpcionEditar: true,
                mostrarOpcionEliminar: true,
                inputsEditar: [
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: true, editable: false},
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false}
                    ],
                    [
                        {nombre: 'categoriaId', titulo: 'Categoria', max: 99, tipo: 'number', validacion:true, uno: false, editable:true},
                        {nombre:'descripcion', titulo: 'Descripcion', tipo:'text', max: 200, validacion: false, valor:'', uno:true, obligatorio: true},
                    ]
                ]
            },
            opciones: ['Buscar', 'Añadir Servicio'],
            opcionSeleccionada: 'Buscar',
            // Configuracion de inputs para crear
            configCrear: {
                urlCrear: 'api/servicios',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:false, obligatorio: true},
                      {titulo: 'Categoria', nombre:'categoriaId', tipo:'number', max: 99 ,  validacion: false, uno:false}
                  ],
                  [
                      {titulo: 'Descripcion', nombre:'descripcion', tipo:'text', max: 200, validacion: false, uno:false}
                       
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
    }
}
</script>

<style scoped>

</style>