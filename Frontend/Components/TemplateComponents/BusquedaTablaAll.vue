<template>
    <div id="main" class="">

        <!--h2 class="text-left width-100">Clientes</h2-->

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
                            <button class="btn-azul text-white" v-if="configuracion.tabla.click.opcionEditar">Editar</button>
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
                const params = {
                    limite: busqueda.limite,
                }
                if(this.busqueda.offset !== 0) {
                    params.offset = busqueda.limite * busqueda.offset;
                }

                if(busqueda.variable !== '' || busqueda.valor !== ''){
                    params[busqueda.variable] = busqueda.valor
                }
                console.log(params)
                const response = await axios.get(this.configuracion.tabla.url, {params} )
                
                this.tablaDatos = response.data
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