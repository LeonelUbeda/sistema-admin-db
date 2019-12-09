<template>
    <div id="contenedor" class="width-100 ">
        <TopSection :opciones="opciones"  :opcionSeleccionada="opcionSeleccionada" @elementoSeleccionado="cambioDeSeccion"></TopSection>
        <div class="width-100 padding-x-60 padding-y-20">
            <div class="titulo flex">
                <h2>Crear Ticket</h2>
                <button class="btn-azul" style="margin-left: auto" @click="enviarTicket">Guardar</button>
            </div> 
            <div class=" mt-3 pt-3 flex justify-between">
                <div class="" style="width: 52%">
                    <div class="sombra bg-white padding-x-20 padding-y-20">
                        <div class="flex justify-between " >
                            <div class="inputs-dobles">
                                <h2>Cliente</h2>
                                <input-foranea v-bind="clienteForanea" v-model="ticket.clienteId" @seleccionado="clienteSeleccionado"></input-foranea> 
                            </div>
                            <div class="inputs-dobles" v-if="ticket.clienteId !== 0" >
                                <h2>Vehiculo</h2>
                                <input-foranea v-bind="vehiculoForanea" v-model="ticket.vehiculoId"></input-foranea>
                            </div>
                        </div>
                        <div class="flex justify-between mt-5">
                            <div class="inputs-dobles">
                                <h2 class="text-lg">Fecha inicio</h2>
                                <input type="date" name="" v-model="ticket.fechaInicio" id="" class="input-default"> 
                            </div>
                            <div class="inputs-dobles">
                                <h2 class="text-lg">Fecha final</h2>
                                <input type="date" name="" v-model="ticket.fechaFinal" id="" class="input-default"> 
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 flex flex-col" id="contenedor-servicios">
                        <div class="flex flex-col servicios-seleccionados justify-center pl-8 mb-3" v-for="(servicio, index) of serviciosSeleccionados" :key="index">
                            <div class="flex pt-3">
                                <h2 class="mr-4">{{servicio.id}}</h2>
                                <h2 class="text-lg">{{servicio.nombre}}</h2>
                                <h2 class="cursor-pointer ml-auto mr-3 text-xl" @click="eliminarServicioSeleccionado(servicio)" style="color: red">X</h2>
                            </div>
                            <div class="divisor mt-3" style="margin-bottom: 5px"></div>
                            <div class="flex my-3">
                                <div class="flex flex-col">
                                    <h2>Precio</h2>
                                    <input type="text" v-model="servicio.precio" class="input-default">
                                </div>
                                <div class="ml-3">
                                    <h2>Prioridad</h2>
                                    <select name="" id=""  class="mt-3">
                                        <option value="Alta">Alta</option>
                                        <option value="Normal" selected>Normal</option>
                                        <option value="Baja">Baja</option>
                                    </select>
                                </div>
                                <div class="flex flex-col items-center ml-3">
                                    <h2>Terminado</h2>
                                    <input type="checkbox" v-model="servicio.terminado" class="mt-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="width: 42%">
                    
                    <div class="titulo flex justify-between">
                        <div style="width:45%">
                            <BusquedaInput @buscar="busqueda"></BusquedaInput>
                        </div>
                        <div style="width:45%">
                            <BusquedaRadio :opciones="opcionesBusqueda" :seleccionado="opcionSeleccionadaRadio" 
                            @seleccion="SeleccionTipoBusqueda"></BusquedaRadio>
                        </div>
                    </div>
                    <Tabla @filaSeleccionada="servicioSeleccionado" :elementos="elementos" :titulos="titulos"></Tabla>
                </div>
            </div>
            
        </div>

        
        
    </div>
</template>

<script>
import TopSection from '../Components/TopSection.vue'
import InputForanea from '../Components/InputForanea.vue'
import Tabla from '../Components/Tabla.vue'
import BusquedaRadio from '../Components/BusquedaRadio'
import BusquedaInput from '../Components/BusquedaInput'
import axios from 'axios'
export default {
    data: () => {
        return {
            opciones: ['Ticket', 'Crear ticket'],
            opcionSeleccionada: 'Ticket',
            opcionesBusqueda: [{value: 'nombre', titulo: 'Nombre'}, {value: 'categorium.nombre', titulo: 'Categoria'}],
            opcionSeleccionadaRadio: 'nombre',
            elementos: [],
            textoBusqueda: '',
            serviciosSeleccionados: [],
            titulos: [{propiedad: 'nombre', titulo: 'Nombre'}, {propiedad: 'categoriaForanea', titulo: 'Categoria', foranea: {propiedadRelacion: 'categorium' , propiedadMostrar: 'nombre'}}],
            serviciosMandar: [],
            ticket: {
                clienteId: 0,
                vehiculoId: null,
                fechaInicio: null,
                fechaFinal: null
            },
            clienteForanea: {
                
                url: '/api/clientes',
                buscarPor: 'nombre',
                insertarPropiedad: 'id',
                mostrarPropiedad: 'nombre',
                titulo: 'Selecciona un cliente',
                propiedadesMostrarTabla: [
                    {propiedad: 'nombre', titulo: 'Nombre'},
                    {propiedad: 'apellido', titulo: 'Apellido'},
                    {propiedad: 'id', titulo: 'Identificador'}
                ]
            },
            vehiculoForanea: {
                url: '',
                buscarPor: 'nombre',
                insertarPropiedad: 'id',
                mostrarPropiedad: 'matricula',
                titulo: 'Selecciona un cliente',
                propiedadesMostrarTabla: [
                    {propiedad: 'id', titulo: 'Identificador' },
                    {propiedad: 'modeloForanea', titulo: 'Modelo' , 
                        foranea: {
                            propiedadRelacion: 'version', 
                            foranea: {
                                propiedad: 'modeloForanea',
                                propiedadRelacion: 'modelo',
                                propiedadMostrar: 'nombre'
                            }
                        }
                    },
                    {propiedad: 'versionForanea', titulo: 'Version', 
                        foranea: {
                            propiedadRelacion: 'version',
                            propiedadMostrar: 'nombre'
                        }
                    },
                    {propiedad: 'matricula', titulo: 'Matricula'},
                    {propiedad: 'tipoForanea', titulo: 'Tipo', foranea: {
                        propiedadRelacion: 'tipo',
                        propiedadMostrar: 'nombre'
                    }},
                ]
            },
            
        }
    },

    methods: {
        enviarTicket(){
            console.log(this.serviciosSeleccionados)
        },
        SeleccionTipoBusqueda(elemento){
            this.opcionSeleccionadaRadio = elemento
        },
        SeleccionTipoBusqueda: function(elemento){

        },
        busqueda(texto){
            this.textoBusqueda = texto
            console.log('Realizando busqueda')
            this.buscarServicios()
        },
        buscarServicios(){
            let params = {}
            
            if(this.textoBusqueda !== ''){
                params[this.opcionSeleccionadaRadio] = this.textoBusqueda
            }
            axios.get('/api/servicios', {params})
            .then((respuesta) => {
                this.elementos = respuesta.data
            })
        },
        eliminarServicioSeleccionado(elemento){
            let contador = 0
            for(let servicio of this.serviciosSeleccionados){
                if(servicio.id === elemento.id){
                    console.log('IGUAL')
                    this.serviciosSeleccionados.splice(contador,1)
                    break
                }
                contador++
            }
        },     
        servicioSeleccionado(elemento) {
            let repetido = false
            for(let servicio of this.serviciosSeleccionados){
                if(servicio.id === elemento.id){
                    repetido = true
                    break;
                }
                
            }
            if (!repetido) this.serviciosSeleccionados.unshift(elemento)
            
        },
        cambioDeSeccion(elemento){
            this.opcionSeleccionada = elemento
        },
        clienteSeleccionado(){
            let clienteId = this.clienteForanea.clienteId
            this.vehiculoForanea.url = '/api/vehiculos/cliente/' + this.ticket.clienteId
            console.log(this.vehiculoForanea.url)

        }
    },
    created(){
        this.buscarServicios()
    },
    components: {
        TopSection,
        InputForanea,
        Tabla,
        BusquedaRadio,
        BusquedaInput
    }
}
</script>


<style lang="scss" scoped>

input, select{
    color: white;
    color: black;
    
}

#contenedor-servicios{
    overflow-y: auto;
    max-height: 500px;
}

input[type=text]{
    height: 25px !important;
    width: 150px ;
}
input[type=checkbox]{
    height: 20px !important;
    width: 50px
}
.servicios-seleccionados{
    width: 100%;
    height: auto;
    background-color: #7798AB;
    color: white;
    background-color: white;
    color: black
}

.inputs-dobles{
    width: 40%;
}
</style>