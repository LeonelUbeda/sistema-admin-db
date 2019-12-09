<template>
    <div id="contenedor" class="width-100 ">
        <TopSection :opciones="opciones"  :opcionSeleccionada="opcionSeleccionada" @elementoSeleccionado="cambioDeSeccion"></TopSection>
        <div class="width-100 padding-x-60 padding-y-20">
            <div class="titulo flex">
                <h2>Crear Ticket</h2>
                <button class="btn-azul" style="margin-left: auto">Guardar</button>
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
                        <div class="flex justify-between">
                            <div class="inputs-dobles">
                                <h2>Fecha inicio</h2>
                                <input type="date" name="" v-model="ticket.fechaInicio" id=""> 
                            </div>
                            <div class="inputs-dobles">
                                <h2>Fecha final</h2>
                                <input type="date" name="" v-model="ticket.fechaFinal" id=""> 
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 flex flex-col">
                        <div class="flex servicios-seleccionados items-center pl-8" v-for="(servicio, index) of serviciosSeleccionados" :key="index">
                            <h2>{{servicio.nombre}}</h2>
                            <h2 class="cursor-pointer ml-auto mr-3" @click="eliminarServicioSeleccionado(servicio)">X</h2>
                        </div>
                    </div>
                </div>
                <div style="width: 42%">
                    <div class="titulo">
                        Buscar
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
import axios from 'axios'
export default {
    data: () => {
        return {
            opciones: ['Ticket', 'Crear ticket'],
            opcionSeleccionada: 'Ticket',
            elementos: [],
            serviciosSeleccionados: [],
            titulos: [{propiedad: 'nombre', titulo: 'Nombre'}, {propiedad: 'descripcion', titulo: 'Descripcion'}],
            ticket: {
                clienteId: 0,
                vehiculoId: 0,
                fechaInicio: 0,
                fechaFinal: 0
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
        axios.get('/api/servicios')
        .then((respuesta) => {
            this.elementos = respuesta.data
        })
    },
    components: {
        TopSection,
        InputForanea,
        Tabla
    }
}
</script>


<style lang="scss" scoped>

.servicios-seleccionados{
    width: 100%;
    height: 50px;
    background-color: aquamarine
}

.inputs-dobles{
    width: 40%;
}
</style>