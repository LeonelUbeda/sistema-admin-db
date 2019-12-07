
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
                <TopSection 
                :opciones="opcionesBusqueda"
                :opcionSeleccionada="opcionSeleccionadaBusqueda"
                @elementoSeleccionado="clickOpcionesBusqueda">
                </TopSection>
                <br>
            
                <BusquedaTablaAll  
                v-bind="BusquedaTablaAllConfig" 
                v-if="opcionSeleccionadaBusqueda === 'Marca'" 
                :key="'BusquedaTablaAllConfig'" > <!--Marca  -->
                </BusquedaTablaAll>
                
              
                <BusquedaTablaAll 
                v-bind="BusquedaTablaModelo" 
                v-if="opcionSeleccionadaBusqueda === 'Modelo'" 
                :key="'BusquedaTablaModelo'">
                </BusquedaTablaAll> <!--Modelo  -->
              

                <BusquedaTablaAll 
                v-if="opcionSeleccionadaBusqueda === 'Version'" 
                v-bind="BusquedaTablaVersion" 
                :key="'BusquedaTablaVersion'">
                </BusquedaTablaAll>  <!--Version  -->

                <BusquedaTablaAll v-if="opcionSeleccionadaBusqueda === 'Tipo'" v-bind="BusquedaTablaTipo" >
                </BusquedaTablaAll>  <!--Tipo  -->
            </div>
        </transition>
        <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Añadir Marca'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Nueva Marca</h2>
                </div>
                <InputTemplate v-bind="configCrearMarca">
                </InputTemplate>
            </div>
        </transition>
       <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Nuevo Modelo'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Nuevo Modelo</h2>
                </div>
                <InputTemplate v-bind="configCrearModelo" >
                </InputTemplate>
            </div>
        </transition>
        <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Nueva Version'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Nueva Version</h2>
                </div>
                <InputTemplate v-bind="configCrearVersion"> 
                </InputTemplate>
            </div>
    
        </transition>
         <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Nuevo Vehiculo'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Nuevo Vehiculo</h2>
                </div>
                <InputTemplate v-bind="configCrearVehiculo">
                </InputTemplate>
            </div>
        </transition>

        
         <transition  mode="out-in">
            <div class="width-100 padding-x-60 padding-y-20 absolute"  v-if="opcionSeleccionada === 'Nuevo Tipo'" >
                <div  class="titulo">
                    <h2 class="text-2xl">Nuevo Tipo</h2>
                </div>
                <InputTemplate v-bind="configCrearTipo">
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

import InputForanea from '../Components/InputForanea'

export default {
    data: () => {
        return {
            BusquedaTablaAllConfig:{
                encabezado:'Marcas',
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}   
                ],
                tablaUrl: '/api/vehiculos/marcas',
                tablaUrlEliminar: '/api/vehiculos/marcas',
                tablaUrlActualizar: '/api/vehiculos/marcas',
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
                mostrarOpcionEditar: true,
                mostrarOpcionEliminar: true,
                
                inputsEditar: [
                    
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: false, editable: false}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: true, obligatorio: true},
                    ],
                    
                ]
            },
            //Inicio config de tabla version
            BusquedaTablaVersion:{
                encabezado:'Version',
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'},
                    {propiedad: 'modelo.nombre', titulo: 'Modelo', foranea: {propiedadRelacion: 'modelo', propiedadMostrar: 'nombre'}}   
                ],
                tablaUrl: '/api/vehiculos/versiones',
                tablaUrlEliminar: '/api/vehiculos/versiones',
                tablaUrlActualizar: '/api/vehiculos/versiones',
                tablaPropiedadAEliminar: 'id',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},
                        {value: 'id', titulo: 'ID'},
                        {value: 'modelo.nombre', titulo: 'Modelo'}],
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
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: false, editable: false}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: true, obligatorio: true},
                    ],
                    [
                        {
                            titulo: 'Modelo ID', 
                            nombre:'modeloId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/vehiculos/modelos',
                            editable: false,
                            foranea: {
                                urlBuscar: '/api/vehiculos/modelos',
                                propiedadElementoBuscar: 'id',
                                propiedadMostrarResultado: 'nombre',
                                url: '/api/vehiculos/modelos',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'id', titulo: 'id Modelo'},
                                    {propiedad: 'nombre', titulo: 'Nombre'},
                                  
                                ]
                            }
                        }
                    ]
                ]
            },

            //Final config de tabla version

            //Inicio config modelo
            BusquedaTablaModelo:{
                encabezado:'Modelo',
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'},
                    {propiedad: 'marca.nombre', titulo: 'Marca', foranea: {propiedadRelacion: 'marca', propiedadMostrar: 'nombre'}} 
                ],
                tablaUrl: '/api/vehiculos/modelos',
                tablaUrlEliminar: '/api/vehiculos/modelos',
                tablaUrlActualizar: '/api/vehiculos/modelos',
                tablaPropiedadAEliminar: 'id',
                tiposBusqueda: [
                        {value: 'nombre', titulo: 'Nombre'},
                        {value: 'id', titulo: 'ID'},
                        {value: 'marca.nombre', titulo: 'Marca'}],
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
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: false, editable: false}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: true, obligatorio: true},
                    ],
                    [
                        {
                            titulo: 'Marca ID', 
                            nombre:'marcaId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:false, 
                            obligatorio: true, 
                            url:'/api/vehiculos/marcas',
                            editable: false,
                            foranea: {
                                urlBuscar: '/api/vehiculos/marcas',
                                propiedadElementoBuscar: 'id',
                                propiedadMostrarResultado: 'nombre',
                                url: '/api/vehiculos/marcas',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'id', titulo: 'id Marca'},
                                    {propiedad: 'nombre', titulo: 'Nombre'},
                                  
                                ]
                            }
                        }
                    ]
                ]
            },
            //Fin config modelo 
            //Inicio config tipo
             BusquedaTablaTipo:{
                esconderBusqueda: false,
                encabezado:'Tipo',
                tablaTitulos: [
                    {propiedad: 'id', titulo: 'Identificador'}, 
                    {propiedad: 'nombre', titulo: 'Nombre'}
                ],
                tablaUrl: '/api/vehiculos/tipos',
                tablaUrlEliminar: '/api/vehiculos/tipos',
                tablaUrlActualizar: '/api/vehiculos/tipos',
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
                mostrarOpcionEditar: true,
                mostrarOpcionEliminar: true,
                
                inputsEditar: [
                    
                    [
                        {nombre: 'id', titulo: 'Identificador', max: 99, tipo: 'text', validacion: true, uno: true, obligatorio: false, editable: false}
                    ],
                    [
                        {nombre: 'nombre', titulo: 'Nombre', max: 50, tipo: 'text', validacion: true, uno: true, obligatorio: true},
                    ]
                ]
            },
            //Final config tipo

            // Menu de arriba
            opciones: ['Buscar','Añadir Marca','Nuevo Modelo','Nueva Version', 'Nuevo Tipo', 'Nuevo Vehiculo'],
            opcionSeleccionada: 'Buscar', 

            //Menu de Tablas
            opcionesBusqueda: ['Marca', 'Modelo', 'Version', 'Tipo'],
            opcionSeleccionadaBusqueda: 'Marca',

            // Configuracion de inputs para crear Marcas
            configCrearMarca: {
                urlCrear: 'api/vehiculos/marcas',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:false, obligatorio: true},
                  ]
                  
                ]  
            },
            configCrearModelo: {

                urlFinal: '/modelos',
                propiedadId: 'marcaId', //ID DEL INPUT A ENVIAR
                urlCrear: 'api/vehiculos/marcas/',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                    [
                          {
                            titulo: 'Marca', 
                            nombre:'marcaId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:true, 
                            obligatorio: true, 
                            url:'/api/vehiculos/marcas',
                            editable: false,
                            foranea: {
                                url: '/api/vehiculos/marcas',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'nombre', titulo: 'Nombre'}
                                ]
                            }
                        }
                    ],
                    [
                        {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:true, obligatorio: true}
                    ]
                ]
            },
            configCrearVersion: {
                urlFinal: '/versiones',
                propiedadId: 'modeloId', //ID DEL INPUT A ENVIAR
                urlCrear: 'api/vehiculos/modelos/',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                    [
                        {
                            titulo: 'Modelo', 
                            nombre:'modeloId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:true, 
                            obligatorio: true, 
                            url:'/api/vehiculos/modelos',
                            editable: false,
                            foranea: {
                                url: '/api/vehiculos/modelos',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'id', titulo: 'Identificador'}, 
                                    {propiedad: 'nombre', titulo: 'Nombre'}
                                ]
                            }
                        }
                    ],
                    [
                        {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:true, obligatorio: true}
                    ]
                ]
            },

            configCrearTipo: {
               
                urlCrear: 'api/vehiculos/tipos',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                    [
                         {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 50, validacion: false, uno:true, obligatorio: true}
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
                            titulo: 'Modelo', 
                            nombre:'modeloId', 
                            tipo:'text', 
                            max: 9999, 
                            validacion: false, 
                            uno:true, 
                            obligatorio: true, 
                            url:'/api/vehiculos/modelos',
                            editable: false,
                            foranea: {
                                url: '/api/vehiculos/modelos',
                                buscarPor: 'nombre',
                                insertarPropiedad: 'id',
                                mostrarPropiedad: 'nombre',
                                propiedadesMostrarTabla: [
                                    {propiedad: 'id', titulo: 'Identificador'}, 
                                    {propiedad: 'nombre', titulo: 'Nombre'}
                                ]
                            }
                        }
                    ],
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
            configIdModelo: {
                url: '/api/vehiculos/modelos',
                campo: 'id'
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
        BusquedaTablaAll,
        InputForanea
    },
    methods: {

        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
  
        },
        clickOpcionesBusqueda: function (dato){
            this.opcionSeleccionadaBusqueda = dato
            
        }

       
    },
    
    created(){
         if(this.$store.state.Permisos.hasOwnProperty('Vehiculos')){
            switch (this.$store.state.Permisos.Servicios) {
                case 4:
                    this.BusquedaTablaAllConfig.mostrarOpcionEliminar = true //Marca
                    this.BusquedaTablaModelo.mostrarOpcionEliminar = true //Modelo
                    this.BusquedaTablaVersion.mostrarOpcionEliminar = true //Version
                    this.BusquedaTablaTipo.mostrarOpcionEliminar = true //Tipo
                case 3: 
                    this.BusquedaTablaAllConfig.mostrarOpcionEditar = true //Marca
                    this.BusquedaTablaModelo.mostrarOpcionEditar = true //Modelo
                    this.BusquedaTablaVersion.mostrarOpcionEditar = true //Version
                    this.BusquedaTablaTipo.mostrarOpcionEditar = true //Tipo
                case 2:
                    this.opciones.push('Crear Servicios')
                case 1:
                    this.opciones.push('Buscar')
                case 0:
                    break;
                default:
                    break
            }
        }
        if(this.$store.state.Permisos.hasOwnProperty('admin')){
            this.BusquedaTablaAllConfig.mostrarOpcionEditar = true //Marca
            this.BusquedaTablaModelo.mostrarOpcionEditar = true //Modelo
            this.BusquedaTablaVersion.mostrarOpcionEditar = true //Version
            this.BusquedaTablaTipo.mostrarOpcionEditar = true //Tipo

            this.BusquedaTablaAllConfig.mostrarOpcionEliminar = true;
            this.BusquedaTablaModelo.mostrarOpcionEliminar = true //Modelo
            this.BusquedaTablaVersion.mostrarOpcionEliminar = true //Version
            this.BusquedaTablaTipo.mostrarOpcionEliminar = true //Tipo
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