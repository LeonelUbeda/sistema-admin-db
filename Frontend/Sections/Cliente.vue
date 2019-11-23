
<template>

<div id="contenedor">

    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>

    <BusquedaTablaAll :configuracion="configuracion"></BusquedaTablaAll>
    <InputTemplate :config="config"  v-if="opcionSeleccionada === 'Crear Cliente'"  >
    </InputTemplate>
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


            busqueda: {
                limite: 10,
                offset: 0,
                variable: '', // nombre  | apellido | ID
                valor: '' // El valor de la variable
            },
            opciones: ['Buscar','Crear Cliente'],
            opcionSeleccionada: 'Buscar', 
            clienteDatos: [],
            clienteTitulos: [
                {
                    propiedad: 'nombre',
                    titulo: 'Nombre'
                },
                {
                    propiedad: 'apellido',
                    titulo: 'Apellido'
                },
                {
                    propiedad: 'direccion',
                    titulo: 'Direccion'
                }
            ],

            config: {
                nameForm: 'Clientes',
                nameButton: 'Que pedos',
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', name:'nombre', type:'text', length: 10, validacion: false, valor:''},
                      {titulo: 'Apellido', name:'apellido', type:'text', length: 10,  validacion: false, valor:''}
                  ],
                  [
                      {titulo: 'Edad', name:'edad', type:'number', length: 99, validacion: false, valor:''}
                  ],
                  [
                      {titulo: 'Telefono', name:'telefono', type:'number', length: 9999999999, validacion: false, valor:''},
                      {titulo: 'ZIP Code', name:'zipcode', type:'number', length: 9999, validacion: false, valor:''},
                      {titulo: 'Tarjeta', name:'tarjeta', type:'number', length: 9999999999999, validacion: false, valor:''}
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
        recargarTablaClientes: function(){
            this.busqueda.variable = ''
            this.busqueda.valor = ''
            this.$refs.BusquedaInputRef.cambiarTexto('')
            this.inputBusquedaTexto = '';
            this.obtenerClientes();
        },
        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
        },
        busquedaSearchBar: function (texto) {
            this.busqueda.valor = texto
            console.log(texto)
            this.obtenerClientes()
        },
        tipoDeBusqueda: function(seleccion){
            this.busqueda.variable = seleccion;
        },
        obtenerClientes: async function(){
            try {
                const params = {
                    limite: this.busqueda.limite,
                }
                if(this.busqueda.offset !== 0) {
                    params.offset = this.busqueda.limite * this.busqueda.offset;
                }

                if(this.busqueda.variable !== '' || this.busqueda.valor !== ''){
                    params[this.busqueda.variable] = this.busqueda.valor
                }
                console.log(params)
                const response = await axios.get('/api/clientes', {params} )

                this.clienteDatos = response.data
                if(response.data.length === 0 ){
                    this.anteriorTablaCliente()
                }
            } catch (error) {
                // INSERTAR ALERTA DE ERROR
            }
        },
        siguienteTablaCliente: function(){
            this.busqueda.offset = this.busqueda.offset + 1
            console.log(this.busquedaCliente)
            this.obtenerClientes()
        },
        anteriorTablaCliente: function(){
            if(this.busqueda.offset !== 0){ 
                this.busqueda.offset = this.busqueda.offset - 1 
                this.obtenerClientes()
            } 
        }
       
    },
    created(){
        this.obtenerClientes();
        
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