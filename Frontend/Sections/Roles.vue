<template>
    <div class="contenedor">
        <TopSection 
            :opciones="opcionesTop"
            :opcionSeleccionada="opcionSeleccionadaTop"
            @elementoSeleccionado="clickOpciones"></TopSection>
            <!--input type="text" v-model="rolId">
            <h1 @click="buscar">BUSCAR</h1-->
        <div class=" flex  padding-x-60 padding-y-20 flex-col items-center justify-center">

            <!--TablaRolPermiso
            :titles="AddTableTitle"
            :action="actionRoles"
            :body="urlObtenerSecciones"
            :defaultValues="EditValues"
            :editInfo="EditRolesInfo"   
            @finish="RolesEnd"/-->
            <div class="width-100 flex justify-between" >
                <div class="width-70">
                    <TablaRolPermisoNew 
                    :secciones="secciones"
                    :titulos="AddTableTitle"
                    :valoresIniciales="valoresIniciales"
                    :modo="modo"
                    :bloquear="bloquearRolesEdicion"
                    @terminado="enviarRolesPermisos"
                    ></TablaRolPermisoNew>
                </div>
                <div id="sidebar" class="bg-white flex flex-col items-center sombra">
                    <div class="bloque-titulo flex items-center">
                        <h2 class="ml-8 text-xl">Selecciona un rol</h2>
                    </div>
                        <div class="divisor"></div>
                    <div class="width-90">

                        <BusquedaInput @buscarDebounce="buscarRoles"></BusquedaInput>
                    </div>
                    
                    <div class="width-100 cursor-pointer" v-for="(resultado, index) of resultadobusquedaRoles" :key="index">
                        <div @click="clickRol(resultado)" class="ml-8 width-100 resultado-box flex items-center padding-l-20">
                            {{resultado.nombre}}
                        </div>
                        
                    </div>
                </div>
            </div>

        
        </div>
    </div>
</template>


<script>
import _ from 'lodash'
import TablaRolPermiso from '../Components/TablaRolPermiso'
import Swal from 'sweetalert2'
import TablaRolPermisoNew from '../Components/TablaRolPermisoNew'
import TopSection from '../Components/TopSection'
import BusquedaInput from '../Components/BusquedaInput'
import axios from 'axios'

export default {
    data: () => {
        return{
            opcionSeleccionadaTop: 'Añadir Rol',
            opcionesTop: ['Añadir Rol', 'Editar Rol'],
            AddTableTitle: ['Seccion','Ninguno', 'Leer' , 'Escribir', 'Actualizar', 'Borrar'],
            AddTableTexts: ['Clasificacion', 'Lotes', 'Productos', 'Reportes'],
            actionRoles: 'add',
            EditRolesInfo: [],
            secciones: [],
            valoresIniciales: {},
            rolId: 0,
            modo: 'edicion',
            busquedaRoles: '',
            resultadobusquedaRoles: [],
            bloquearRolesEdicion: true
        }
    },
    methods: {
        clickRol: function(resultado){
            this.bloquearRolesEdicion = false
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
            console.log(secciones)
           
        }
    },
    components: {
        TablaRolPermiso,
        TablaRolPermisoNew,
        TopSection,
        BusquedaInput
    },
    created(){
        this.buscarRoles()
        this.obtenerSeccionesYPermisos()
    }
}
</script>



<style lang="scss" scoped>
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