<template>
    <div class="main" >
        <transition name="fade">
            <div id="popup-container"  v-if="mostrarPopupEditar">
                <div :class="['width-100 padding-x-20 padding-y-20 ',]" id="popup">
                    <h2 class="text-xl">{{tituloPopup.titulo}} {{elementoClickeado[tituloPopup.propiedadElementoClickeado]}}</h2>
                    <InputTemplate name v-bind="configEditInputTemplate" @clickBotonSecundario="mostrarPopupEditar = false" 
                    @elementoActualizado="() => {mostrarPopupEditar = false; reiniciarTabla()}"
                    @elementoCreado="elementoCreadoEvento">
                    </InputTemplate>
                </div>
            </div>
        </transition>
        <div class="width-100 flex justify-between">

             <div class="contenedor-tabla">
                <TablaTitulo :titulo="encabezado" @recargar="reiniciarTabla"></TablaTitulo>
                <Tabla 
                :elementos="tablaDatos"
                :titulos="tablaTitulos"
                @siguiente="siguienteTablaCliente"
                @atras="anteriorTablaCliente"
                @filaSeleccionada="filaSeleccionada"
                ></Tabla>
            </div>
            <div id="sidebar" class="flex flex-col sombra" >
                <div class="bloque-titulo flex items-center ">
                    <h2 class="ml-8 text-xl">Busqueda</h2>
                </div>
                <div class="flex items-center bg-white flex-col">
                    <div class="divisor"></div>
                    <BusquedaRadio @seleccion="manejarTipoBusqueda" ref="busquedaRadioinput" :seleccionado="busquedaSeleccionada" :opciones="tiposBusqueda"></BusquedaRadio>
                    <div style="width: 90%">
                        <BusquedaInput ref="BusquedaInputRef" @buscar="busquedaSearchBar"></BusquedaInput>
                    </div>

                    <div class="flex flex-col container items-center card" v-if="mostrarInformacionClick === true && clickEnTabla === true">
                        <div class="bloque-titulo flex items-center">
                            <h2 class="ml-8 text-xl">Edicion</h2>
                            <h2 class="ml-auto mr-8 cursor-pointer text-xl" style="color:red" @click="(clickEnTabla = false)">X</h2>
                        </div>
                        <div class="divisor"></div>

                        <div v-for="elemento of titulosClick" :key="elemento.propiedad" class="flex flex-col container px-8 mb-5">
                    
                            <h2 class="text-xl">{{elemento.titulo}}</h2>
                            <h5>{{elementoClickeado[elemento.propiedad]}}</h5>
                          
                        </div>

                        <div class="flex">
                            <button class="btn-rojo text-white" v-if="mostrarOpcionEliminar" @click="eliminarElementoSeleccionado">Eliminar</button>
                            <button class="btn-azul text-white" v-if="mostrarOpcionEditar" @click="editarElementoSeleccionado">Editar</button>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    


    </div>
</template>


<script>

import clasesUtilesCSS from '../../assets/css/clasesUtiles'
import axios from 'axios'
import 'babel-polyfill'
import {eliminarDialog} from '../../Utils/sweetAlert'
/* ----- Componentes  ----- */

import TopSection from '../../Components/TopSection'
import Tabla from '../../Components/Tabla'
import TablaTitulo from '../../Components/TablaTitulo'
import InputTemplate from '../../Components/InputTemplate.vue'
import BusquedaInput from '../../Components/BusquedaInput.vue'
import BusquedaRadio from '../../Components/BusquedaRadio.vue'
export default {
    props:{
        encabezado: {
            type: String,
            default: 'PRIX PONELE TITULO'
        },
        tablaTitulos: {
            type: Array,
            default: () => [{propiedad: 'id', titulo: 'Identificador'}, 
                            {propiedad: 'nombre', titulo: 'Nombre'}, 
                            {propiedad: 'apellido', titulo: 'Apellido'}]
        },
        // Direccion que utiliza el componente para obtener la informacion de la tabla
        tablaUrl: {
            type: String, 
            default:  '/api/clientes'
        },
        // Direccion que utiliza el componente para eliminar un componente de la tabla
        tablaUrlEliminar: {
            type: String,
            default: '/api/clientes'
        },
        // Direccion que se le pasa al componente InputTemplate para que actualice la informacion. 
        //En el hook Created se asigna esta variable a configEditInputTemplate.urlActualizar para que la utilice InputTemplate
        tablaUrlActualizar: {
            type: String,
            default: '/api/clientes'
        },
        propiedadActualizar: {
            type: String,
            default: 'id'
        },
        // Propiedad que se utiliza como condicional al eliminar, Ejemplo: 
        // DELETE FROM TABLA WHERE id = 2
        tablaPropiedadAEliminar: {
            type: String, 
            default: 'id'
        },
        // Mandar evento al hacer click en un registro de la tabla? WIP, no implementado
        tablaMandarEventoClick: {
            type: Boolean,
            default: false
        },
        // Mostrar informacion en el sidebar al darle click
        mostrarInformacionClick: {
            type: Boolean,
            default: true
        },
        // Informacion que se muestra al darle click a un registro de la tabla
        titulosClick: {
            type:  Array,
            default: () => [{propiedad: 'id', titulo: 'Identificador'}, {propiedad: 'nombre', titulo: 'Nombre del cliente'}]
        },
        // Mostrar el boton de editar al darle click (si mostrarInformacionClick == false entonces esto queda invalido)
        mostrarOpcionEditar: {
            type: Boolean,
            default: true
        },
        mostrarOpcionEliminar: {
            type: Boolean,
            default: true
        },
        // CONFIGURACION DE LOS INPUTS para editar
        inputsEditar: {
            type: Array,
            default: () => [[{identificador: 'id', titulo: 'Identificador', max: 2, tipo: 'text', validacion: true, uno: true, valor: 'hey'}]]
        },
        tituloPopup: {
            type: Object,
            default: () => {return {titulo: 'Editar cliente ID: ', propiedadElementoClickeado: 'id'}}
        },
        editarLongitudMaxima: {
            type: Array,
            default: () => [5]
        },
        editarTipo: {
            type: Array,
            default: () => ['number']
        },

        // Tipos de busqueda
        tiposBusqueda: {
            type: Array,
            default: () => [
                        [{value: 'nombre', titulo: 'Nombre'},{value: 'apellido', titulo: 'Apellido'}],
                        [{value: 'direccion', titulo: 'Direccion'},{value: 'id', titulo: 'ID'}]]
        },
        busquedaDefault: {
            type: String,
            default: 'nombre'
        }       
    },
    data: () => {
        return {
            configCrear: {
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: false,
                inputs: []  
            },
            defaultValues: {

            },
            mostrarPopupEditar: false,
            clickEnTabla: false,
            elementoClickeado: {},
            busqueda: {
                limite: 10,
                offset: 0,
                variable: '', // nombre  | apellido | ID
                valor: '' // El valor de la variable
            },
            busquedaSeleccionada: '',
            // Barra lateral. Opciones de busqueda y su seleccion inicial por defecto
            //tiposBusqueda: [],
            // Informacion de la tabla
            tablaDatos: [],
            //tablaTitulos: [], 
            configEditInputTemplate: {
                nombreBotonSecundario: 'Cancelar',
                mostrarBotonSecundario: true,
                estilo: false,
                mostrarTitulo: false,
                nombreBoton: 'Guardar',
                inputs: [],
                urlActualizar: '',
                modoCrear: false,
                /*mostrarTitulo: true,
                nameForm: 'Editar Cliente'*/
            }

        }
    },
    
    methods: {
        editarElementoSeleccionado: function(){
            
            
            this.configEditInputTemplate.inputs = this.inputsEditar;

            // Itero sobre el arreglo de arreglos
            // [ [] ,  [] ,  [] ]
            this.inputsEditar.forEach((arreglo, indexArreglo) => {
                // Itero sobre el arreglo de objetos
                // [ {} , {}, {} ]
                arreglo.forEach((elemento, indexElemento) => {  // Esto se puede refactorizar de alguna manera, al rato lo hago
                    // Asigno el valor de  la propiedad correspondiente de elementoClickeado al valor inicial de un input
                    // Como ejemplo, al inicio del ciclo, una supuesta operacion sería esta
                    // configEditInputTemplate.inputs[0][0].valor = elementoClickeado.id;
                    
                    // Entonces el input que tiene el nombre 'id' tiene de valor el elemento 'id' del objeto elementoClickeado
                    this.configEditInputTemplate.inputs[indexArreglo][indexElemento].valor = this.elementoClickeado[elemento.nombre]

                    // Documentar esto pls
                    if(typeof this.configEditInputTemplate.inputs[indexArreglo][indexElemento].foranea !== 'undefined'){
                        let temp = this.configEditInputTemplate.inputs[indexArreglo][indexElemento].foranea
                        
                        let url = temp.urlBuscar + '/'+ this.elementoClickeado[temp.propiedadElementoBuscar]
                        axios.get(url)
                        .then((respuesta) => {return respuesta.data})
                        .then((respuesta) => {
                            this.configEditInputTemplate.inputs[indexArreglo][indexElemento].foranea.mostrar = respuesta[temp.propiedadMostrarResultado]
                            console.log(this.configEditInputTemplate.inputs[indexArreglo][indexElemento].foranea)
                        })

                    }
                    // El componente InputTemplate se encarga de renderizar todo esto correctamente
                  
                })
            })
            this.mostrarPopupEditar = true;
         
        },
        eliminarElementoSeleccionado: async function() {
            //const click = this.configuracion.tabla.click
            //console.log(`${click.urlDelete}/${this.elementoClickeado[this.tablaPropiedadAEliminar]}`)
            let url = `${this.tablaUrlEliminar}/${this.elementoClickeado[this.tablaPropiedadAEliminar]}`
            eliminarDialog(url)
            .then(() => {
                this.reiniciarTabla()
            })
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        filaSeleccionada: function(elemento){
            if(this.tablaMandarEventoClick === false){
                this.elementoClickeado = elemento
                this.clickEnTabla = true
            }else{
                this.$emit('clickTabla', elemento)
            }
        },
        reiniciarTabla: function(){
            this.clickEnTabla = false
            this.busqueda.valor = ''
            this.busqueda.variable = ''
        
            this.$refs.BusquedaInputRef.cambiarTexto('')

            this.inputBusquedaTexto = ''
            
            this.busquedaSeleccionada = this.tiposBusqueda[0].value
            this.$refs.busquedaRadioinput.reRender()
            this.obtenerDatos()
        },
        clickOpciones: function (dato){
            this.busquedaSeleccionada = dato
        },
        busquedaSearchBar: function (texto) {
            this.clickEnTabla = false
            this.busqueda.valor = texto
            this.obtenerDatos()
        },
        manejarTipoBusqueda: function(seleccion){
            this.clickEnTabla = false
            this.busqueda.variable = seleccion;
            this.busquedaSeleccionada = seleccion
        },
        obtenerDatos: async function(){
            try {
                const busqueda = this.busqueda
                const params = {
                    limite: busqueda.limite,
                }
                if(this.busqueda.offset !== 0) {
                    params.offset = busqueda.limite * busqueda.offset;
                }

                // Si variable y valor tienen valores entonces se añade al objeto params
                if(busqueda.variable !== '' && busqueda.valor !== ''){
                    params[busqueda.variable] = busqueda.valor
                }
                const response = await axios.get(this.tablaUrl, {params})
                this.tablaDatos = response.data
             
                if(response.data.length === 0 ){
                    this.anteriorTablaCliente()
                }
            } catch (error) {
                console.log(error)
            }
        },
        siguienteTablaCliente: function(){
            this.busqueda.offset = this.busqueda.offset + 1
            console.log(this.busquedaCliente)
            this.obtenerDatos()
        },
        anteriorTablaCliente: function(){
            if(this.busqueda.offset !== 0){ 
                this.busqueda.offset = this.busqueda.offset - 1 
                this.obtenerDatos()
            } 
        },
        elementoCreadoEvento: function() {
            this.$emit('elementoCreado')
        }
    },
    created(){
        this.obtenerDatos();
        this.configEditInputTemplate.urlActualizar = this.tablaUrlActualizar
        this.configEditInputTemplate.propiedadActualizar = this.propiedadActualizar
        this.busquedaSeleccionada =             this.busquedaDefault
        this.busqueda.variable =                this.busquedaDefault
        /*const config =                          this.configuracion;
        this.busqueda.variable =                config.busqueda.busquedaSeleccionada
        this.tiposBusqueda =                    config.busqueda.tiposBusqueda
        this.tablaTitulos =                     config.tabla.tablaTitulos*/
        
    },
    components: {
        TopSection,
        Tabla,
        TablaTitulo,
        InputTemplate,
        BusquedaInput,
        BusquedaRadio
    },
    
}
</script>



<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
    opacity: 1;
    width: 800px;
    height: calc(100% - 100px);
    top: 50px;
    left: calc(50% - (800px / 2) );
    z-index: 20;
    position: fixed;
    overflow-y: auto;
    background-color: white;
   
}


#sidebar{
    width: 25%;
    height: 200px;
    
}

.main{
    
    display: flex;
    flex-direction: column;
    align-items: center;
}
.contenedor-tabla{
    width: 70%;
}


</style>