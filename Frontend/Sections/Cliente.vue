
<template>

<div id="contenedor">

    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>
    
    <BusquedaTablaAll v-bind="BusquedaTablaAllConfig" v-if="opcionSeleccionada === 'Buscar'"></BusquedaTablaAll>
    <div class="width-100 padding-x-20 padding-y-20">
        <InputTemplate v-bind="configCrear"  v-if="opcionSeleccionada === 'Crear Cliente'"  >
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
                        {nombre: 'id', titulo: 'Identificador', max: 2, tipo: 'text', validacion: true, uno: true}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: false},
                        {nombre: 'apellido', titulo: 'Apellido', max: 50, tipo: 'text', validacion: true, uno: false }
                    ],
                    [
                        {nombre: 'direccion', titulo: 'Direccion', max: 150, tipo: 'text', validacion: true, uno: false}
                    ],
                    [
                        {nombre: 'edad', titulo: 'Edad', max: 99, tipo: 'number', uno: true}
                    ]
                ]
            },
            configuracion: {
                tabla: {
                    url: '/api/clientes',
                    tablaTitulos: [
                        {propiedad: 'id',titulo: 'ID'},
                        {propiedad: 'nombre',titulo: 'Nombre'},
                        {propiedad: 'apellido',titulo: 'Apellido'},
                        {propiedad: 'direccion',titulo: 'Direccion'},
                        {propiedad: 'tipoCliente',titulo: 'Tipo Cliente'}
                    ],
                    click: { 
                        // Hacer click en la tabla
                        urlDelete: '/api/clientes',
                        urlEdit: '/api/clientes',

                        propiedadAlEliminar: 'id',
                        // Al hacer click, se mostrara un pequeño cuadro con la información del elemento clickeado.
                        // La siguiente información será mostrada en ese cuadro
                        // datosMostrar y titulosMostrar tienen una correspondencia de 1:1 así que hay que declararlos ordenadamente
                        datosMostrar: ['id','nombre','apellido', 'direccion'],
                        //titulosMostrar: ['Identificador', 'Nombre', 'Apellido', 'olaquetal'],

                        // Al hacer click se desea mandar un evento?
                        mandarEvento: false, 
                        opcionEditar: true,
                        opcionEliminar: true,

                        // Al dar click a un elemento, mostrar la informacion de edicion?
                        opcionEdicion: true,
                    },
                    configuracionEditar: { 
                        // Al editar un elemento se van a mostrar los inputs de los siguientes elementos
                        datosEditar:    ['id',              'nombre',   'apellido',     'direccion'],
                        titulosEditar:  ['Identificador',   'Nombre',   'Apellido',     'Direccion'],
                        max:            [5,                 5,          5,              5],
                        tipo:           ['number',          'text',     'number',          'text']
                    }
                },
                busqueda: { 
                    // Esto es para las opciones de busqueda para la tabla
                    tiposBusqueda: [
                        [{value: 'nombre', titulo: 'Nombre'},{value: 'apellido', titulo: 'Apellido'}],
                        [{value: 'direccion', titulo: 'Direccion'},{value: 'id', titulo: 'ID'}]
                    ],
                    // Tipo de busqueda seleccionada por defecto
                    busquedaSeleccionada: 'nombre'
                }
            },

            opciones: ['Buscar','Crear Cliente'],
            opcionSeleccionada: 'Buscar', 
            configCrear: {
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, valor:'', uno:false},
                      {titulo: 'Apellido', nombre:'apellido', tipo:'text', max: 50 ,  validacion: false, valor:'', uno:false}
                  ],
                  [
                      {titulo: 'Edad', nombre:'edad', tipo:'number', max: 50, validacion: false, valor:'', uno:true}
                  ],
                  [
                      {titulo: 'Dirección', nombre:'direccion', tipo:'text', max: 100, validacion: false, valor:'', uno:false},
                      {titulo: 'Tipo de cliente', nombre:'tipoCliente', tipo:'text', max: 9999, validacion: false, valor:'', uno:false, 
                        opciones: ['Persona', 'Empresa']},
                      {titulo: 'Tarjeta', nombre:'tarjeta', tipo:'number', max: 9999999999999, validacion: false, valor:'', uno:false}
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
#sidebar{
    width: 25%;
    height: 200px;
    
}

#main{
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.contenedor-tabla{
    width: 70%;
}


</style>