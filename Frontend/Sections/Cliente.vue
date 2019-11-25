
<template>

<div id="contenedor">

    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>
    
    <BusquedaTablaAll :configuracion="configuracion" v-if="opcionSeleccionada === 'Buscar'"></BusquedaTablaAll>
    <div class="width-100 padding-x-20 padding-y-20">
        <InputTemplate :config="config"  v-if="opcionSeleccionada === 'Crear Cliente'"  >
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

            configuracion: {
                tabla: {

                    url: '/api/clientes',
                    
                    tablaTitulos: [
                         {propiedad: 'id',titulo: 'ID'},
                        {propiedad: 'nombre',titulo: 'Nombre'},
                        {propiedad: 'apellido',titulo: 'Apellido'},
                        {propiedad: 'direccion',titulo: 'Direccion'}
                    ],
                    click: {
                        urlDelete: '/api/clientes',
                        propiedadAlEliminar: 'id',
                        datosMostrar: ['id','nombre','apellido', 'direccion'],
                        titulosMostrar: ['Identificador', 'Nombre', 'Apellido', 'direccionnn'],
                        mandarEvento: false,
                        opcionEditar: true,
                        opcionEliminar: true
                    }
                },
                busqueda: {
                    tiposBusqueda: [
                        [{value: 'nombre', titulo: 'Nombre'},{value: 'apellido', titulo: 'Apellido'}],
                        [{value: 'direccion', titulo: 'Direccion'},{value: 'id', titulo: 'ID'}]
                    ],
                    busquedaSeleccionada: 'nombre'
                }
            },

            opciones: ['Buscar','Crear Cliente'],
            opcionSeleccionada: 'Buscar', 
            config: {
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', tamano: 10, validacion: false, valor:'', uno:false},
                      {titulo: 'Apellido', nombre:'apellido', tipo:'text', tamano: 10,  validacion: false, valor:'', uno:false}
                  ],
                  [
                      {titulo: 'Edad', nombre:'edad', tipo:'number', tamano: 99, validacion: false, valor:'', uno:true}
                  ],
                  [
                      {titulo: 'Telefono', nombre:'telefono', tipo:'number', tamano: 99999999999, validacion: false, valor:'', uno:false},
                      {titulo: 'ZIP Code', nombre:'zipcode', tipo:'number', tamano: 9999, validacion: false, valor:'', uno:false},
                      {titulo: 'Tarjeta', nombre:'tarjeta', tipo:'number', tamano: 9999999999999, validacion: false, valor:'', uno:false}
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