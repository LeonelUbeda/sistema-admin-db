<template>
    <div id="contenedor">
        <!--TablaRolPermiso
        :titles="AddTableTitle"
        :action="actionRoles"
        :body="urlObtenerSecciones"
        :defaultValues="EditValues"
        :editInfo="EditRolesInfo"
        @finish="RolesEnd"/-->


        <TablaRolPermisoNew 
        :secciones="Secciones"
        :titulos="AddTableTitle"
        />
    </div>
</template>


<script>
import TablaRolPermiso from '../Components/TablaRolPermiso'
import TablaRolPermisoNew from '../Components/TablaRolPermisoNew'
import axios from 'axios'
export default {
    data: () => {
        return{
            AddTableTitle: ['Seccion','Ninguno', 'Leer' , 'Escribir', 'Actualizar', 'Borrar'],
            AddTableTexts: ['Clasificacion', 'Lotes', 'Productos', 'Reportes'],
            actionRoles: 'add',
            EditRolesInfo: [],
            Secciones: []
        }
    },
    methods: {
        obtenerSecciones: function(){
            axios.get('/api/permisos')
            .then((respuesta) =>{
                console.log(respuesta.data)
                this.Secciones = respuesta.data
            })
        }
    },
    components: {
        TablaRolPermiso,
        TablaRolPermisoNew
    },
    created(){
        this.obtenerSecciones()
    }
}
</script>



<style lang="scss" scoped>

</style>