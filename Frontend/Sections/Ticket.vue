<template>
    <div id="contenedor" class="width-100 ">
        <div class="absolute top-0 right-0 flex mt-1 mr-3" v-if="ticketSeleccionado">
            <div class="btn-azul-no-margin mx-3" @click="trabajarSeleccionado">
                <h2>Trabajar</h2>
            </div>
            <div class="btn-rojo-no-margin" @click="editarSeleccionado">
                <h2>Editar</h2>
            </div>
        </div>
        <TopSection :opciones="opciones"  :opcionSeleccionada="opcionSeleccionada" @elementoSeleccionado="cambioDeSeccion"></TopSection>
        <div class="width-100 padding-x-60 padding-y-20" v-if="opcionSeleccionada == 'Crear ticket' || opcionSeleccionada == 'Editar'">
            <div class="titulo flex">
                <h2 class="text-xl" v-if="!modoEdicion">Crear Ticket</h2>
                <h2 v-else class="text-xl">Eliminar Servicios</h2>
                <button class="btn-azul" style="margin-left: auto" @click="enviarTicket" v-if="!modoEdicion">Guardar</button>
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
                    <div class="mt-3 flex flex-col" id="contenedor-servicios" v-for="(servicio, index) of serviciosSeleccionados" :key="index">
                        <Servicio :elemento="servicio" @eliminado="eliminarServicioSeleccionado" :key="servicio.nombre"></Servicio>
                    </div>
                </div>

                <div style="width: 42%">  
                    <div class="titulo flex justify-between relative" v-if="!modoEdicion">
                        <div class="absolute top-0 width-100  flex justify-center items-center blur" style="z-index: 9999; height: 100%" v-if="modoEdicion">
                            
                        </div>
                        <div style="width:45%">
                            <BusquedaInput @buscar="busquedaServicios"></BusquedaInput>
                        </div>
                        <div style="width:45%">
                            <BusquedaRadio :opciones="opcionesBusqueda" :seleccionado="opcionSeleccionadaRadio" 
                            @seleccion="SeleccionTipoBusqueda"></BusquedaRadio>
                        </div>
                    </div>
                    <div class="relative ">
                        <div class="absolute top-0 width-100  flex justify-center items-center" style="z-index: 9999; height: 100%" v-if="modoEdicion">
                            <div class="mensaje-rojo">
                                Desactivado!
                            </div>
                        </div>
                        <Tabla :desactivado="modoEdicion" @filaSeleccionada="servicioSeleccionado" :elementos="elementosServicios" :titulos="titulos" :key="'TABLASERVICIOS'"></Tabla>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="width-100 padding-x-60 padding-y-20 flex justify-between" v-if="opcionSeleccionada == 'Ticket'">
            <div style="width:100%">
                <div style="width: 100%">
                    <div class="titulo flex justify-between">
                        <div style="width:45%">
                            <BusquedaInput @buscar="busquedaInputTicket"></BusquedaInput>
                        </div>
                        <div style="width:30%">
                            <BusquedaRadio :opciones="opcionesBusquedaTicket" :seleccionado="opcionSeleccionadaTicket" 
                            @seleccion="SeleccionTipoBusquedaTicket"></BusquedaRadio>
                        </div>
                        <div style="width:10%">
                            <BusquedaRadio :opciones="opcionLimite" :seleccionado="opcionSeleccionadaLimite" 
                            @seleccion="SeleccionTipoLimite"></BusquedaRadio>
                        </div>
                    </div>
                </div>
                <div>
                    <tabla :elementos="elementosTablaTicket" :titulos="titulosTablaTicket" @filaSeleccionada="ticketSeleccionadoEvento"><tabla>
                </div>

            </div>
            
        </div>


        <div class="width-100 padding-x-60 padding-y-20 flex flex-col justify-between" v-if="opcionSeleccionada == 'Trabajar'">
            <div class="titulo">
                Editar {{elementoTicketClickeado.id}}
            </div>
            <div class="flex width-100 justify-between">
                <div class="flex flex-col width-100" style="width: 75%">
                    <div :class="['flex flex-col sombra px-4 pt-4 pb-1 mb-5', {'borde-noterminado': !servicio.ticketservicio.terminado} , {'borde-terminado': servicio.ticketservicio.terminado}]" style="min-height: 130px; border-radius:10px" 
                    v-for="servicio of elementoTicketClickeado.servicios" :key="servicio.id">
                        <div class="flex flex-no-wrap">
                            <div class="flex">
                                <div class="width-100 mb-3 mr-8 items" v-if="servicio.nombre">
                                    <h2 class="text-xl mb-1">Servicio:</h2>
                                    <h2>{{servicio.nombre}}</h2>
                                </div>
                                <div class="width-100 mb-3 mr-8 items" v-if="servicio.descripcion">
                                    <h2 class="text-xl mb-1">Descripcion:</h2>
                                    <h2>{{servicio.descripcion}}</h2>
                                </div>
                            </div>
                            <div class="width-100 mb-3 mr-8 items">
                                <h2 class="text-xl">Detalles:</h2>
                                <h2 v-if="servicio.ticketservicio.descripcion">{{servicio.ticketservicio.descripcion}}</h2>
                                <h2 v-else>Ninguno</h2>
                            </div>
                            <div v-if="servicio.ticketservicio.prioridad" class="mb-3 ml-auto">
                                <h2 class="text-xl">Prioridad</h2>
                                <h2 :class="[
                                {'rojo': servicio.ticketservicio.prioridad == 'Alta'},
                                {'turquoise': servicio.ticketservicio.prioridad == 'Normal'},
                                {'verde': servicio.ticketservicio.prioridad == 'Baja'}
                                ]">{{servicio.ticketservicio.prioridad}}</h2>
                            </div>
                        </div>
                        <div class="divisor" style="margin-bottom: 8px; width: 100%"></div>
                        <div class="flex">
                            <div>
                                <h2>Precio</h2>
                                <h2 class="pl-1">{{servicio.ticketservicio.precio}}</h2>
                            </div>
                            <div class="ml-auto flex flex-col items-center">
                                <h2>Terminado</h2>
                                <input type="checkbox" :disabled="$store.state.Permisos.Tickets > 3" v-on:change="marcarServicio('/api/ticketservicio/ticket/'+ elementoTicketClickeado.id + '/servicio/' + servicio.id , servicio.ticketservicio.terminado)" name="" v-model="servicio.ticketservicio.terminado" id="" style="height:25px; width: 20px;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sombra rounded" style="width: 22%; height: 330px;">
                    <h2 class="text-2xl pt-4 pl-4 pb-2">Vehiculo</h2>
                    <div class="width-100 flex flex-col items-center">
                        <div class="divisor" style="margin-bottom: 5px"></div>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-xl  p-2 pl-4">Matricula:</h2>
                        <h2 class="pl-6 text-sm">>{{elementoTicketClickeado.auto.matricula}}</h2>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-xl  p-2 pl-4">Marca:</h2>
                        <h2 class="pl-6 text-sm">>{{elementoTicketClickeado.auto.version.modelo.marca.nombre}}</h2>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-xl  p-2 pl-4">Modelo:</h2>
                        <h2 class="pl-6 text-sm">>{{elementoTicketClickeado.auto.version.modelo.nombre}}</h2>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-xl  p-2 pl-4">Version:</h2>
                        <h2 class="pl-6 text-sm">>{{elementoTicketClickeado.auto.version.nombre}}</h2>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import Swal from 'sweetalert2'
import TopSection from '../Components/TopSection.vue'
import InputForanea from '../Components/InputForanea.vue'
import Tabla from '../Components/Tabla.vue'
import BusquedaRadio from '../Components/BusquedaRadio'
import BusquedaInput from '../Components/BusquedaInput'
import Servicio from '../Components/Minicomponents/Servicio'
import axios from 'axios'
export default {
    data: () => {
        return {
            opcionSeleccionadaLimite: '10',

            // Cuando vas a buscar y le das clic a un ticket...
            ticketSeleccionado: false,

            elementoTicketClickeado: {},
            busquedaTicket: '',
            opcionesBusquedaTicket: [
                {value: 'auto.matricula', titulo: 'Matricula'}, 
                {value: 'id', titulo: 'Identificadorr'}
            ],
            opcionSeleccionadaTicket: 'auto.matricula',
            opcionLimite: [
                {value: '10', titulo: 'Limite 10'},
                {value: '20', titulo: 'Limite 20'},
                {value: '50', titulo: 'Limite 50'},
                {value: '100', titulo: 'Limite 100'},
            ],
            modoEdicion: false,
            opciones: ['Ticket', 'Crear ticket'],
            opcionSeleccionada: 'Ticket',
            elementosTablaTicket: [],
            titulosTablaTicket: [
                {propiedad: 'id',           titulo: 'Identificador'},
                {propiedad: 'matricula',    titulo: 'Matricula'},
                {propiedad: 'marca',        titulo: 'Marca'},
                {propiedad: 'modelo',       titulo: 'Modelo'},
                {propiedad: 'version',       titulo: 'Version'},
            ],
            opcionesBusqueda: [
                {value: 'nombre', titulo: 'Nombre'}, 
                {value: 'categorium.nombre', titulo: 'Categoria'}
            ],
            titulos: [
                {propiedad: 'nombre', titulo: 'Nombre'}, 
                {propiedad: 'categoriaForaneaa', titulo: 'Categoria', foranea: {propiedadRelacion: 'categorium' , propiedadMostrar: 'nombre'}
            }],
            elementosServicios: [],
            opcionSeleccionadaRadio: 'nombre',
            textoBusqueda: '',
            serviciosSeleccionados: [],
            serviciosSeleccionadosTemporal: [],
            serviciosMandar: [],
            ticket: {
                clienteId: 0,
                vehiculoId: null,
                fechaInicio: null,
                fechaFinal: null
            },

            ticketTemporal: {},
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
        marcarServicio(url, valor){
            console.log(url, valor)
            Swal.fire({
                title: 'Desea cambiar?',
                text: 'Puede rehacer en cualquier momento',
                showCancelButton: true,
                icon: 'info',
                confirmButtonText: 'Si',
                showLoaderOnConfirm: true,
                preConfirm:() => {
                    return axios.put(url, {terminado: valor})
                    .then((respuesta) => console.log(respuesta.data))
                    .catch(error => {throw error})

                }
            })
            .then((value) => {
                if(value.value){
                    Swal.fire({
                        text: 'Se ha cambiado la prioridad',
                        icon: 'success'
                    })
                }
            })
            .catch(() => {
                Swal.fire({
                    text: 'Ha ocurrido un error!',
                    icon: 'error'
                })
            })
        },
        async eliminarServicio(url){
            Swal.fire({
                title: 'Desea eliminar?',
                showCancelButton: true,
                confirmButtonText: 'Exactamente',
                showLoaderOnConfirm: true,
                preConfirm:() => {
                    
                    return axios.delete(url)
                    .then((respuesta) => console.log(respuesta.data))
                    .catch(error => {throw error})

                }
            })
            .then((value) => {
                if(value.value){
                    Swal.fire({
                        text: 'Eliminado exitosamente!',
                        icon: 'success'
                    })
                }
            })
            .catch(() => {
                Swal.fire({
                        text: 'Ha ocurrido un error!',
                        icon: 'error'
                    })
            })
        },
        async editarSeleccionado(){
            this.modoEdicion = true
            this.elementosServicios = {}
            await this.buscarServicios()
            
            let respuesta = await axios.get('/api/tickets/' + this.elementoTicketClickeado.id)
            let servicios = respuesta.data.servicios
            this.vehiculoForanea.url = '/api/vehiculos/cliente/' + respuesta.data.cliente.id
            this.vehiculoForanea.mostrar =  respuesta.data.auto.matricula
            this.clienteForanea.mostrar =   respuesta.data.cliente.nombre



            this.ticket = {
                clienteId: respuesta.data.clienteId,
                vehiculoId: respuesta.data.vehiculoId,
                fechaInicio: respuesta.data.fechaInicio,
                fechaFinal: respuesta.data.fechaFinal
            }

        
            for(let servicio of servicios){
                let elementoNuevo = servicio.ticketservicio
                elementoNuevo.nombre = servicio.nombre
                elementoNuevo.id = servicio.id
                this.serviciosSeleccionados.unshift(elementoNuevo)
            }
            console.log(this.serviciosSeleccionados)
            this.opcionSeleccionada = 'Editar'
        },
        toggle(elemento){
            elemento = !elemento
        },
        async trabajarSeleccionado(){
            await this.obtenerTicketDetalle()
            this.opcionSeleccionada = 'Trabajar'
            this.ticketSeleccionado = false
        },
        ticketSeleccionadoEvento(elemento){
            this.elementoTicketClickeado = elemento
            this.ticketSeleccionado = true;
        },
        busquedaInputTicket(elemento){
            this.busquedaTicket = elemento
            this.obtenerTickets()
            console.log('Evento input')
        },
        obtenerTickets(){
            let params = {}
            params.limite = this.opcionSeleccionadaLimite

            if(this.busquedaTicket !== ''){
                params[this.opcionSeleccionadaTicket] = this.busquedaTicket
            }
            console.log('Obteniendo tickets', params)
            axios.get('/api/tickets/', {params})
            .then((respuesta) => {
                this.elementosTablaTicket = []
                let tickets = respuesta.data
                let contador = 0
                for(let ticket of tickets){
                    let temp = {}
                    temp.matricula = ticket.auto.matricula,
                    temp.version = ticket.auto.version.nombre
                    temp.marca = ticket.auto.version.modelo.marca.nombre
                    temp.modelo = ticket.auto.version.modelo.nombre
                    temp.fechaInicio = ticket.fechaInicio,
                    temp.fechaFinal = ticket.fechaFinal,
                    temp.id = ticket.id
                    this.elementosTablaTicket.unshift(temp)
                }
            })
        },
        async obtenerTicketDetalle(){
            let respuesta = await axios.get('/api/tickets/' + this.elementoTicketClickeado.id)
            this.elementoTicketClickeado = respuesta.data
        },
        enviarTicket(){
            let enviados = 0
            if(!this.modoEdicion){
                Swal.fire({
                    title: 'Desea enviar ticket?',
                    showCancelButton: true,
                    confirmButtonText: 'Exactamente',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        if(this.ticket.fechaInicio === null) this.ticket.fechaInicio = new Date()
                        return axios.post('/api/tickets', this.ticket)
                        .then(async (respuesta) => {
                            console.log(respuesta.data)
                            if(this.serviciosSeleccionados.length > 0){
                                for(let servicio of this.serviciosSeleccionados){
                                    try {  
                                        let elementoAEnviar = {
                                            categoriaId: servicio.categoriaId,
                                            servicioId: servicio.id,
                                            ticketId: respuesta.data.id,
                                            prioridad: servicio.prioridad,
                                            precio: servicio.precio,
                                            descripcion: servicio.descripcion,
                                            terminado: servicio.terminado
                                        }
                                        console.log(elementoAEnviar)
                                        console.log('ELEMENTO SERVICIO', elementoAEnviar)
                                        let ticketServicioCreado = await axios.post('/api/ticketservicio/', elementoAEnviar)
                                        console.log(ticketServicioCreado)

                                    } catch (error) {
                                        throw error
                                        console.log(error)
                                    }
                                    
                                }
                                return 'yeih'
                            }
                            

                        })
                        .catch(() => {
                            Swal.showValidationMessage('Error, intentelo de nuevo')
                        })
                    }
                })
                .then((resultado) => {
                    if(resultado.value){
                        Swal.fire({
                            title: 'Terminado!',
                            icon: 'success'
                        })
                    }
                })
            
            }else{
                
            }
        
        },
        SeleccionTipoBusqueda(elemento){
            this.opcionSeleccionadaRadio = elemento
        },
        SeleccionTipoLimite(elemento){
            this.opcionSeleccionadaLimite = elemento
        },
        SeleccionTipoBusquedaTicket: function(elemento){
            this.opcionSeleccionadaTicket = elemento
        },
        busquedaServicios(texto){
            this.textoBusqueda = texto
            console.log('Realizando busqueda')
            this.buscarServicios()
        },
        async buscarServicios(){
            let params = {}
            
            if(this.textoBusqueda !== ''){
                params[this.opcionSeleccionadaRadio] = this.textoBusqueda
            }

            let respuesta = await axios.get('/api/servicios', {params})
            this.elementosServicios = respuesta.data
            
        },
        async eliminarServicioSeleccionado(elemento){
            if(this.modoEdicion){
                console.log('/api/ticketservicio/ticket/' + this.elementoTicketClickeado.id +'/servicio/'+ elemento.id)
                await this.eliminarServicio('/api/ticketservicio/ticket/' + this.elementoTicketClickeado.id +'/servicio/'+ elemento.id)
            }else{
                let contador = 0
                for(let servicio of this.serviciosSeleccionados){
                    if(servicio.id === elemento.id){
                       
                        this.serviciosSeleccionados.splice(contador,1)
                        break
                    }
                    contador++
                }
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
            delete elemento.descripcion
            if (!repetido) {
                elemento.prioridad = 'Normal'
                this.serviciosSeleccionados.unshift(elemento)
            }
            
        },
        cambioDeSeccion(elemento){
            if(elemento === 'Crear ticket'){
                this.buscarServicios()
            }else if(elemento === 'Ticket'){
                this.obtenerTickets()
            }
            this.opcionSeleccionada = elemento
            this.ticketSeleccionado = false
            this.elementoTicketClickeado = {}
            this.serviciosSeleccionados = []
            this.modoEdicion = false;

        },
        clienteSeleccionado(){
            let clienteId = this.clienteForanea.clienteId
            this.vehiculoForanea.url = '/api/vehiculos/cliente/' + this.ticket.clienteId
            console.log(this.vehiculoForanea.url)

        }
    },
    created(){
        if(this.opcionSeleccionada === 'Ticket'){
            this.obtenerTickets()
        }else{
            
        }
    },
    components: {
        TopSection,
        InputForanea,
        Tabla,
        BusquedaRadio,
        BusquedaInput,
        Servicio
    }
}
</script>


<style lang="scss" scoped>

.items{
    width: 250px;
    height: 100%;

}

input, select{
    color: white;
    color: black;
    
}

#contenedor-servicios{
    overflow-y: auto;
    max-height: 500px;
    >div{
        
    }
}


.inputs-dobles{
    width: 40%;
}
</style>