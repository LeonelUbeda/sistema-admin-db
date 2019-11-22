
<template>

<div id="contenedor">
    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>

    <div id="main">
        <h2 class="text-left width-100">Clientes</h2>
        
        <br><br>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem excepturi, debitis ex quis quisquam ea suscipit minima unde! Reprehenderit rem corrupti non, voluptates quo maxime suscipit sit doloribus! Iste, quisquam?
        <br><br><br><br><br>
        <div class="contenedor-tabla">
            <TablaTitulo v-if="opcionSeleccionada === 'Buscar'" :titulo="'Cliente'"></TablaTitulo>
            <Tabla v-if="opcionSeleccionada === 'Buscar'"
            :elementos="clienteDatos"
            :titulos="clienteTitulos"></Tabla>
        </div>  
        <InputTemplate :inputs="inputs"  v-if="opcionSeleccionada === 'Crear'" >
        </InputTemplate>
    



    </div>
</div>

</template>



<script>
import clasesUtilesCSS from '../assets/css/clasesUtiles'
import axios from 'axios'
import 'babel-polyfill'
import TopSection from '../Components/TopSection'
import Tabla from '../Components/Tabla'
import TablaTitulo from '../Components/TablaTitulo'
import InputTemplate from '../Components/InputTemplate'

export default {
    data: () => {
        return {
            opciones: ['Buscar','Crear'],
            opcionSeleccionada: 'Buscar', 
            clienteDatos: [],
            clienteTitulos: [
                {
                    propiedad: 'nombre',
                    titulo: 'Nombre'
                },
                {
                    propiedad: 'apellido',
                    titulo: 'Apellido'
                },
                {
                    propiedad: 'direccion',
                    titulo: 'Direccion'
                }
            ],
              inputs: [
                
                    {
                        titulo: 'Nombre',
                        name :'nombre',
                        type: 'text',
                        length: 10

                    },
                    {
                        titulo: 'Apellido',
                        name :'apellido',
                        type: 'text',
                        length: 10

                    }
                ,
               
                
                    {
                        titulo: 'Edad',
                        name: 'edad',
                        type: 'number',
                        length: 3
                    }
                
            ]   

        }
    },
    components:{
        TopSection,
        Tabla,
        TablaTitulo,
        InputTemplate
    },
    methods: {
        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
        },
        obtenerClientes: async function(){
            try {
                const response = await axios.get('/api/clientes')
                this.clienteDatos = response.data
                
            } catch (error) {
                // INSERTAR ALERTA DE ERROR
            }
        }
    },
    created(){
        this.obtenerClientes();
    }
}
</script>



<style lang="scss" scoped>
#main{
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.contenedor-tabla{
    width: 80%;
}










</style>