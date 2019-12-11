
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
                <BusquedaTablaAll @clickTabla="ver"
                v-bind="BusquedaTablaAllConfig"
                @tablaReiniciada="() => {clienteTemporal = {}}" 
                v-if="opcionSeleccionadaBusqueda === 'Cliente'" 
                :key="'BusquedaTablaAllConfig'" > <!--Cliente  -->
                </BusquedaTablaAll>
            </div>
        </transition>
        <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Crear'" >
                <TopSection 
                :opciones="opcionesBusqueda"
                :opcionSeleccionada="opcionSeleccionadaBusqueda"
                @elementoSeleccionado="clickOpcionesBusqueda">
                </TopSection>
                <InputTemplate v-if="opcionSeleccionadaBusqueda === 'Cliente'" v-bind="configCrear" @elementoCreado="elementoCreado" ref="inputTemplateCliente">
                </InputTemplate>
                <InputTemplate v-if="opcionSeleccionadaBusqueda === 'Telefono'" v-bind="configCrearTel" @elementoCreado="elementoCreado" ref="inputTemplateCliente">
                </InputTemplate>
                <InputTemplate v-if="opcionSeleccionadaBusqueda === 'Vehiculo'" v-bind="configCrearVehiculo" @elementoCreado="elementoCreado" ref="inputTemplateCliente" >
                </InputTemplate>
            </div>
        </transition>
    </div>
    <div class="width-100"  id="popup-container" v-if="popUpTelefono == true">
            <div id="popup" class="">
                <div class="flex">
                    <h2 class="text-2xl">Telefonos</h2>
                </div>
                <div class="divisor mt-3" style="width: 100%"></div>
               
                <Tabla :sombra="false" class="mt-6" :elementos="elementosTelefono" :titulos="propiedadesMostrarTelefono" @filaSeleccionada="clickTelefono"></Tabla>
                
            
                <div class="flex width-100 justify-center">
                    <button  @click="() => {popUpTelefono=false}" class="btn-azul ml-auto">Cancelar</button>
                    <button class="btn-rojo ml-auto" v-if="telefonoTemporal.hasOwnProperty('telefono')" @click="eliminarTelefono" >Eliminar</button>
                </div>
             
            </div>
        </div>
         <div class="width-100"  id="popup-container" v-if="popUpVehiculo == true">
            <div id="popup" class="">
                <div class="flex">
                    <h2 class="text-2xl">Vehiculos</h2>
                </div>
                <div class="divisor mt-3" style="width: 100%"></div>
               
                <Tabla :sombra="false" class="mt-6" :elementos="elementosVehiculo" :titulos="propiedadesMostrarVehiculo" @filaSeleccionada="clickVehiculo" :key="'tablaVehiculo'"></Tabla>
                <div class="flex width-100 justify-center">
                    <button  @click="() => {popUpVehiculo=false}" class="btn-azul ml-auto">Cancelar</button>
                    <button class="btn-rojo ml-auto" v-if="vehiculoTemporal.hasOwnProperty('id')" @click="eliminarVehiculo" >Eliminar</button>
                </div>
             
            </div>
        </div>

   <h2 v-if="clienteTemporal.hasOwnProperty('id')" class="btn-azul text-white" @click="clickVerTelefono" style="position: absolute; top: 68%; right : 5%;">Telefono</h2>
   <h2 v-if="clienteTemporal.hasOwnProperty('id')" class="btn-azul text-white" @click="clickVerVehiculo" style="position: absolute; top: 68%; right : 14%;">Vehiculo</h2>
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
import InputForanea from '../Components/InputForanea'
import { async } from 'q'

export default {
    data: () => {
        return {
            BusquedaTablaAllConfig:{
                encabezado:'Clientes',
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}, 
                    {propiedad: 'apellido', titulo: 'Apellido'},
                    {propiedad: 'tipoCliente', titulo: 'Tipo'}
                ],
                tablaUrl: '/api/clientes',
                tablaUrlEliminar: '/api/clientes',
                tablaUrlActualizar: '/api/clientes',
                tablaPropiedadAEliminar: 'id',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},{value: 'apellido', titulo: 'Apellido'},
                        {value: 'direccion', titulo: 'Direccion'},{value: 'id', titulo: 'ID'}],
                tablaMandarEventoClick: true,
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
            }, //Buscar telefono

            // Menu de arriba
            opciones: [],
            opcionSeleccionada: 'Buscar',
            //Menu abajo de arriba
            opcionesBusqueda: ['Cliente','Telefono','Vehiculo'],
            opcionSeleccionadaBusqueda: 'Cliente',

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
            },
            configCrearTel: {
                urlCrear: '/api/clientes/',
                url: '/api/clientes/',
                propiedadConcatenar: 'clienteId',
                urlFinal: '/telefono',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {
                            titulo: 'Nombre', 
                            nombre:'clienteId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/clientes',
                            editable: false,
                            foranea: {
                                urlBuscar: '/api/clientes',
                                propiedadElementoBuscar: 'id',
                                propiedadMostrarResultado: 'nombre',
                                url: '/api/clientes',
                                buscarPor: 'Nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'id', titulo: 'ID'},
                                    {propiedad: 'nombre', titulo: 'Nombre'},
                                    {propiedad: 'apellido', titulo: 'Apellido'}
                                ]
                            }
                      },
                      {nombre: 'telefono', titulo: 'Telefono', max: 15, tipo: 'number', uno: true}
                  ]
                  
                  
                ]  
            },
            configCrearVehiculo: {
                urlCrear: '/api/vehiculos/',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                    [ 
                       {
                            titulo: 'Version', 
                            nombre:'versionId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/vehiculos/versiones',
                            editable: false,
                            foranea: {
                                url: '/api/vehiculos/versiones',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'marcaTitulo', titulo: 'Marca', foranea: {propiedadRelacion: 'modelo', propiedadMostrar: 'nombre'}},
                                    {propiedad: 'nombre', titulo: 'Nombre'}
                                ]
                            }
                       },
                       {
                            titulo: 'Cliente', 
                            nombre:'clienteId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/clientes',
                            editable: false,
                            foranea: {
                                url: '/api/clientes',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'cedula', titulo: 'Cedula'},
                                    {propiedad: 'nombre', titulo: 'Nombre'},
                                    {propiedad: 'apellido', titulo: 'Apellido'}
                                  
                                ]
                            }
                       }
                    ],
                    [
                        
                        {
                            titulo: 'Tipo', 
                            nombre:'tipoId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/clientes',
                            editable: false,
                            foranea: {
                                url: '/api/vehiculos/tipos',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'nombre', titulo: 'Nombre'}
                                ]
                            }
                        },
                        {titulo: 'Matricula', nombre:'matricula', tipo:'text', max: 30, validacion: false, uno:false, obligatorio: true}
                    ]

                ]
            },
            clienteTemporal: {},
            popUpTelefono: false,
            popUpVehiculo: false,
            elementosTelefono: [],
            propiedadesMostrarTelefono: [{propiedad: 'telefono', titulo: 'Telefono'}],
            telefonoTemporal: {},
            elementosVehiculo: [],
            propiedadesMostrarVehiculo: [
                 {propiedad: 'matricula', titulo: 'Matricula'},
                 {propiedad: 'marca', titulo: 'Marca'},
                 {propiedad: 'modelo', titulo:'Modelo'},
                 {propiedad: 'version', titulo: 'Version'},
                 {propiedad: 'tipo', titulo: 'Tipo'}
            ],
            vehiculoTemporal: {}
            
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
        elementoCreado: function(elementoFinal){

           // this.$refs.inputTemplateCliente.borrarInputsData('')
            // this.opcionSeleccionadaBusqueda = elementoFinal
            this.opcionSeleccionada = 'Buscar'
        },
        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
            this.clienteTemporal = {}
        },
        clickOpcionesBusqueda: function (dato){
            this.opcionSeleccionadaBusqueda = dato
            
        },
        ver(elemento){
            this.clienteTemporal = elemento
        },//lo que se tiene del telefono del cliente
        clickVerTelefono(){
            let url = '/api/clientes/'+this.clienteTemporal.id+'/telefono'
            axios.get(url).then(response => {
                console.log(response.data)
                this.elementosTelefono= response.data
                this.popUpTelefono = true
            })
        },//cuando clickeas un telefono
        clickTelefono(elemento){
            this.telefonoTemporal = elemento
        },
        eliminarTelefono(){
            let url = '/api/clientes/'+this.telefonoTemporal.clienteId+'/telefono/'+this.telefonoTemporal.telefono
            axios.delete(url).then(response => this.clickVerTelefono())
        },
        clickVerVehiculo(){
            let url = '/api/vehiculos/cliente/'+this.clienteTemporal.id
            axios.get(url).then(response => {
               
                this.elementosVehiculo
                for(let elementos of response.data){
                    let elementoInsertar = {
                        marca: elementos.version.modelo.marca.nombre,
                        modelo: elementos.version.modelo.nombre,
                        version: elementos.version.nombre,
                        tipo: elementos.tipo.nombre,
                        matricula: elementos.matricula
                    }
                    this.elementosVehiculo.unshift(elementoInsertar)
                }
                this.popUpVehiculo = true
            })
        },//cuando clickeas un telefono
        clickVehiculo(elemento){
            this.vehiculoTemporal = elemento
            console.log(this.vehiculoTemporal)
        },
        eliminarVehiculo(){
            let url = '/api/vehiculos/cliente/'+this.vehiculoTemporal.Id
            axios.delete(url).then(response => this.clickVerVehiculo())
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
                    this.opciones.push('Crear')
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
            this.opciones.push('Crear')
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