<template>
    <div id="main" class="">

        <!--h2 class="text-left width-100">Clientes</h2-->
        <div id="popup-container" @click="mostrarPopupEditar = false" v-if="mostrarPopupEditar">
            <div id="popup">
               <div class="width-100 padding-x-20 padding-y-20">
                    <InputTemplate :config="config" >
                    </InputTemplate>
                </div>
            </div>
        </div>
        <div class="width-100 flex justify-between">

            <div class="contenedor-tabla">
                <TablaTitulo :titulo="'Cliente'" @recargar="reiniciarTablaClientess"></TablaTitulo>
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
                    <BusquedaRadio @seleccion="manejarTipoBusqueda" :seleccionado="busquedaSeleccionada" :opciones="tiposBusqueda"></BusquedaRadio>
                    
                    <div style="width: 90%">
                        <BusquedaInput ref="BusquedaInputRef" @buscar="busquedaSearchBar"></BusquedaInput>
                    </div>

                    <div class="flex flex-col container items-center card" v-if="configuracion.tabla.click.mandarEvento === false && clickEnTabla === true">
                        <div class="bloque-titulo flex items-center ">
                            <h2 class="ml-8 text-xl">Edicion</h2>
                            <h2 class="ml-auto mr-8 cursor-pointer text-xl" style="color:red" @click="(clickEnTabla = false)">X</h2>
                        </div>
                        <div class="divisor"></div>

                        <div v-for="(elemento, index) in configuracion.tabla.click.datosMostrar" :key="index" class="flex flex-col container px-8 mb-5">
                            <h2 class="text-xl">{{configuracion.tabla.click.titulosMostrar[index]}}</h2>
                            <h5>{{elementoClickeado[elemento]}}</h5>
                        </div>

                        <div class="flex">
                            <button class="btn-rojo text-white" v-if="configuracion.tabla.click.opcionEliminar" @click="eliminarElementoSeleccionado">Eliminar</button>
                            <button class="btn-azul text-white" v-if="configuracion.tabla.click.opcionEditar" @click="editarElementoSeleccionado">Editar</button>
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
import {alertaEliminar} from '../../Utils/sweetAlert'
/* ----- Componentes  ----- */

import TopSection from '../../Components/TopSection'
import Tabla from '../../Components/Tabla'
import TablaTitulo from '../../Components/TablaTitulo'
import InputTemplate from '../../Components/InputTemplate'
import BusquedaInput from '../../Components/BusquedaInput.vue'
import BusquedaRadio from '../../Components/BusquedaRadio.vue'
export default {
    props:{
        configuracion: Object
    },
    data: () => {
        return {
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
            tiposBusqueda: [],
            // Informacion de la tabla
            tablaDatos: [],
            tablaTitulos: [], 
            config: {
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', nombre:'nombre', tipo:'text', max: 10, validacion: false, valor:'', uno:false},
                      {titulo: 'Apellido', nombre:'apellido', tipo:'text', max: 10,  validacion: false, valor:'', uno:false}
                  ],
                  [
                      {titulo: 'Edad', nombre:'edad', tipo:'number', max: 99, validacion: false, valor:'', uno:false}
                  ],
                  [
                      {titulo: 'Telefono', nombre:'telefono', tipo:'number', max: 99999999999, validacion: false, valor:'', uno:false},
                      {titulo: 'ZIP Code', nombre:'zipcode', tipo:'number', max: 9999, validacion: false, valor:'', uno:false},
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
        BusquedaRadio
    },
    methods: {
        editarElementoSeleccionado: function(){
            this.mostrarPopupEditar = true;
        },
        eliminarElementoSeleccionado: function() {
            const click = this.configuracion.tabla.click
            console.log(`${click.urlDelete}/${this.elementoClickeado[click.propiedadAlEliminar]}`)

            alertaEliminar(`${click.urlDelete}/${this.elementoClickeado[click.propiedadAlEliminar]}`)
            
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        filaSeleccionada: function(elemento){
            if(this.configuracion.tabla.click.mandarEvento === false){
                this.elementoClickeado = elemento
                this.clickEnTabla = true
            }else{
                this.$emit('clickTabla', elemento)
            }
        },
        reiniciarTablaClientess: function(){
            this.clickEnTabla = false
            this.busqueda.valor = ''
            this.$refs.BusquedaInputRef.cambiarTexto('')
            this.inputBusquedaTexto = ''
            
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
        },
        obtenerDatos: async function(){
            try {
                const busqueda = this.busqueda
                const query = {
                    limite: busqueda.limite,
                }
                if(this.busqueda.offset !== 0) {
                    query.offset = busqueda.limite * busqueda.offset;
                }
                // Si variable y valor tienen valores entonces se añade al objeto query
                if(busqueda.variable !== '' || busqueda.valor !== ''){
                    query[busqueda.variable] = busqueda.valor
                }
                const response = await axios.get(this.configuracion.tabla.url, {query} )
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
        }
    },
    created(){
        this.obtenerDatos();
        const config =                          this.configuracion;
        this.busqueda.variable =                config.busqueda.busquedaSeleccionada
        this.busquedaSeleccionada =             config.busqueda.busquedaSeleccionada
        this.tiposBusqueda =                    config.busqueda.tiposBusqueda
        this.tablaTitulos =                     config.tabla.tablaTitulos
        
    }
}
</script>



<style lang="scss" scoped>


#popup-container{
    width: 100vw;
    height: 100vh;;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($color: #B7B7B7, $alpha: 0.5);
   
}

#popup{
    width: 500px;
    height: calc(100% - 100px);
    top: 50px;
    left: calc(50% - (500px / 2) );
    z-index: 20;
    position: fixed;
    overflow-y: auto;
    background-color: white;
   
}

.card{
    padding:20px 0 20px 0;
    box-sizing: border-box;
    width: 100%;
}

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