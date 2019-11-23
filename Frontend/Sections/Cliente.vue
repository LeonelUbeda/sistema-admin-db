
<template>

<div id="contenedor">

    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>

    <div id="main">

        <h2 class="text-left width-100">Clientes</h2>

        <div class="width-100 flex justify-around">

            <div class="contenedor-tabla" v-if="opcionSeleccionada === 'Buscar'">
                <TablaTitulo :titulo="'Cliente'" @recargar="recargarTablaClientes"></TablaTitulo>
                <Tabla 
                :elementos="clienteDatos"
                :titulos="clienteTitulos"
                @siguiente="siguienteTablaCliente"
                @atras="anteriorTablaCliente"></Tabla>
            </div>

            <div id="sidebar" class="flex">
                
            </div>

        </div>
    
        <InputTemplate :config="config"  v-if="opcionSeleccionada === 'Crear Cliente'"  >
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
            busqueda: {
                limite: 10,
                offset: 0,
            },
            opciones: ['Buscar','Crear Cliente'],
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

            config: {
                nameForm: 'Clientes',
                nameButton: 'Que pedos',
                inputs: [
                  [/*El length en caso de texto es la cantidad maxima de caracteres y en el caso de numeros el numero maximo*/ 
                      {titulo: 'Nombre', name:'nombre', type:'text', length: 10, validacion: false, valor:''},
                      {titulo: 'Apellido', name:'apellido', type:'text', length: 10,  validacion: false, valor:''}
                  ],
                  [
                      {titulo: 'Edad', name:'edad', type:'number', length: 99, validacion: false, valor:''}
                  ],
                  [
                      {titulo: 'Telefono', name:'telefono', type:'number', length: 9999999999, validacion: false, valor:''},
                      {titulo: 'ZIP Code', name:'zipcode', type:'number', length: 9999, validacion: false, valor:''},
                      {titulo: 'Tarjeta', name:'tarjeta', type:'number', length: 9999999999999, validacion: false, valor:''}
                  ]
                  
                ]  
            }
     

        }
    },
    components:{
        TopSection,
        Tabla,
        TablaTitulo,
        InputTemplate
    },
    methods: {
        recargarTablaClientes: function(){
            this.obtenerClientes();
        },
        clickOpciones: function (dato){
            this.opcionSeleccionada = dato
        },
        obtenerClientes: async function(){
            try {
                const params = {
                    limite: this.busqueda.limite,
                }
                if(this.busqueda.offset !== 0) {
                    params.offset = this.busqueda.limite * this.busqueda.offset;
                }
                console.log(params)
                const response = await axios.get('/api/clientes', {params} )

                this.clienteDatos = response.data
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
            this.obtenerClientes()
        },
        anteriorTablaCliente: function(){
            if(this.busqueda.offset !== 0){ 
                this.busqueda.offset = this.busqueda.offset - 1 
                this.obtenerClientes()
            } 
        }
       
    },
    created(){
        this.obtenerClientes();
    }
}
</script>



<style lang="scss" scoped>
#sidebar{
    width: 20%;
    height: 50px;
    background-color: red;
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