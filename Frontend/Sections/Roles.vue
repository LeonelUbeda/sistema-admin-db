<template>
    <div class="contenedor" v-if="cargando == false">

        <TopSection 
        :opciones="opcionesTop"
        :opcionSeleccionada="opcionSeleccionadaTop"
        @elementoSeleccionado="clickOpciones">
        </TopSection>
           
        <div class="width-100 relative">
            <div v-if="resultadobusquedaRoles == 0 && opcionSeleccionadaTop === 'Editar Rol'" class="absolute width-100" id="mensaje-bloqueado" style="z-index: 10000">
                    <div>
                        <div class="mensaje-rojo">  
                            <h1 class="text-2xl text-white">No hay roles!</h1>
                        </div>
                    </div>
            </div>
        </div>

        <div class="flex  padding-y-20 flex-col items-center relative" >
            <transition  mode="out-in">
                <div class="width-100 padding-x-60 absolute" v-if="opcionSeleccionadaTop === 'Añadir Rol'">
                    <div  class="titulo">
                        <h2 class="text-2xl">Crear Cliente</h2>
                    </div>
                    <InputTemplate
                    v-bind="configCrear" 
                    @elementoCreado="rolCreado">
                    </InputTemplate>
                </div>
            </transition>
            <transition  mode="out-in">
                <div class="width-100 flex justify-between absolute padding-x-60" v-if="resultadobusquedaRoles.length > 0 && opcionSeleccionadaTop == 'Editar Rol'">
                    
                    <div class="width-70">
                        <TablaRolPermisoNew 
                        :secciones="secciones"
                        :titulos="AddTableTitle"
                        :rolEditar="rolEditar"
                        :valoresIniciales="valoresIniciales"
                        :modo="modo"
                        :bloquear="bloquearRolesEdicion"
                        @eliminar="eliminarRol"
                        @terminado="enviarRolesPermisos"

                        ></TablaRolPermisoNew>
                    </div>
                    <div id="sidebar" class="bg-white flex flex-col items-center sombra">
                        <div class="bloque-titulo flex items-center">
                            <h2 class="ml-8 text-xl" >Selecciona un rol</h2>
                        </div>
                            <div class="divisor"></div>
                        
                        <div class="width-100 flex flex-col items-center" >
                            <div class="width-90">

                                <BusquedaInput @buscarDebounce="buscarRoles"></BusquedaInput>
                            </div>
                           
                            <div class="width-100 cursor-pointer" v-for="(resultado, index) of resultadobusquedaRoles" :key="index">
                                <div @click="clickRol(resultado)" class="ml-8 mt-2 width-100 resultado-box flex items-center padding-l-20">
                                    {{resultado.nombre}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        
        </div>
    </div>
</template>


<script>
import _ from 'lodash'
import TablaRolPermiso from '../Components/TablaRolPermiso'
import InputTemplate from '../Components/InputTemplate'
import Swal from 'sweetalert2'
import TablaRolPermisoNew from '../Components/TablaRolPermisoNew'
import TopSection from '../Components/TopSection'
import BusquedaInput from '../Components/BusquedaInput'
import axios from 'axios'
import { msjEliminar } from '../Utils/swalRequest'
export default {
    data: () => {
        return{
            opcionSeleccionadaTop: 'Editar Rol',
            opcionesTop: ['Editar Rol', 'Añadir Rol'],
            AddTableTitle: ['Seccion','Ninguno', 'Leer' , 'Escribir', 'Actualizar', 'Borrar'],
            AddTableTexts: ['Clasificacion', 'Lotes', 'Productos', 'Reportes'],
            actionRoles: 'add',
            EditRolesInfo: [],
            secciones: [],      // Lista de todas las secciones o mejor dicho, los "permisos"
            valoresIniciales: {},
            rolId: 0, 
            rolEditar: {},
            rolEditarOld: {},
            modo: 'edicion',
            busquedaRoles: '', // Variable del input para hacer la busqueda de los roles
            resultadobusquedaRoles: [],  // Contiene todos los roles existentes. AL menos los primeros 10
            bloquearRolesEdicion: true,
            cargando: true,
            configCrear: {
                urlCrear: 'api/roles',
                mostrarTitulo: false,
                nombreBoton: 'Enviar',
                estilo: true,
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre del rol', nombre:'nombre', tipo:'text', max: 50, validacion: true, uno:false, obligatorio: true},
                      
                  ]
                ]  
            }
        }
    },
    methods: {
        eliminarRol: function(elemento){
            msjEliminar('/api/roles/' + elemento.id)
            .then(() => {
                this.buscarRoles()
                this.obtenerSeccionesYPermisos()
                this.bloquearRolesEdicion = true
            })
            .catch(() => {
                console.log('hel')
            })
            /*axios.delete('/api/roles/' + elemento.id)
            .then(() => {
                Swal.fire({
                    text: 'ELIMINAO'
                })
                .then(() => {
                
            })
            })*/
            
        },
        rolCreado: function(){
            this.opcionSeleccionadaTop = this.opcionesTop[0]
        },
        clickRol: function(resultado){
            
            this.rolEditar = {...resultado}
            this.rolEditarOld = {...resultado}
            if(this.secciones.length > 0){
                this.bloquearRolesEdicion = false
            }
            this.rolId = resultado.id
            this.obtenerSeccionesYPermisos()
        },
        buscarRoles:function(busqueda){
            this.busquedaRoles = busqueda
            axios.get('/api/roles', {
                params: {
                    nombre: this.busquedaRoles
                }
            })
            .then((response) => {
                console.log(response.data)
                this.resultadobusquedaRoles = response.data
            })

            
        },
        buscar: function(){
            this.obtenerSeccionesYPermisos()
        },
        clickOpciones: function(e){
            this.opcionSeleccionadaTop = e
        },
        verificar: function(){
            //console.log(this.secciones)
        },
        enviarRolesPermisos:async function(){
            console.log('/api/roles/' + this.rolEditar.id)
            if(this.rolEditarOld.nombre != this.rolEditar.nombre){
                axios.put('/api/roles/' + this.rolEditar.id , {nombre: this.rolEditar.nombre})
                .then(response => console.log('respuesta', response))
                .catch(error => console.log(error))
            }
            if(/*this.modo == 'edicion' */ true){
                let params = {
                    rolId: this.rolId
                } //api/rolpermiso/rol/1/permiso/1
                
                for(let seccion of this.secciones){
                    params.permisoId = seccion.id

                    let respuesta = await axios.get('/api/rolpermiso', {params})
                    if(typeof respuesta.data[0] == 'undefined'){

                        let url = '/api/rolpermiso/'
                        let enviar = {
                            nivelAcceso: seccion.valor,
                            permisoId: seccion.id,
                            rolId: this.rolId
                        }
                        let creado = await axios.post(url, enviar)
                        
                    }else{
                        
                        if(respuesta.data[0].nivelAcceso != seccion.valor){

                            let url = '/api/rolpermiso/rol/'+ this.rolId +'/permiso/' + seccion.id

                            let editado = await axios.put(url, {nivelAcceso: seccion.valor})

                            if(editado.data == 0){

                            }
                            
                            
                        }
                    }
                }
                Swal.fire({
                    title: 'Completao',

                })
                this.buscarRoles()
                this.obtenerSeccionesYPermisos()   
                //let respuesta = await axios.get('/api/rolpermiso', {params})
            }
            //console.log(this.secciones)
        },
        obtenerSeccionesYPermisos: async function(){

            /* Bueno, ni yo le entiendo y lo acabo de hacer. Suerte carnal */
            let [secciones, permisos] = await Promise.all([axios.get('/api/permisos'), axios.get('/api/roles/' + this.rolId + '/permisos')]) 
            permisos = permisos.data[0]
            secciones = secciones.data

            //console.log(permisos)
            for(let seccion of secciones){
                if(typeof permisos != 'undefined'){
                    for(let permiso of permisos.Permisos){
                        if(seccion.nombre == permiso.nombre){
                            if( this.modo !== 'blocked'){

                                seccion.valor = permiso.RolPermiso.nivelAcceso
                            }
                            //console.log(permiso.RolPermiso.nivelAcceso)
                        }
                        
                    }
                }
                if(typeof seccion.valor == 'undefined'){
                    seccion.valor = 0
                }
            }
            this.secciones = secciones
            this.cargando = false
            console.log(secciones)
           
        }
    },
    components: {
        TablaRolPermiso,
        TablaRolPermisoNew,
        TopSection,
        BusquedaInput,
        InputTemplate
    },
    created(){
        this.buscarRoles()
        this.obtenerSeccionesYPermisos()
    }
}
</script>



<style lang="scss" scoped>
#mensaje-bloqueado{
    height: 500px;
}


.contenedor{
    display: absolute;
}
#sidebar{
    width: 27%
}


.resultado-box{
    width: 100%;
    height: 40px;
}
</style>