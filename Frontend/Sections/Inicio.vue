
<template>
    <div>
            <h1>Bienvenido</h1>

            <table>
                <tr>
                    <th v-for="(valor, nombre) in cliente[0]">{{nombre}}</th>
                </tr>
                
                <tr :key="index" v-for="(contenido, index) in cliente">
                    <th v-for="elemento of contenido">{{elemento}}</th>
                </tr>
                
            </table>
    </div>
</template>



<script>
import axios from 'axios'
import 'babel-polyfill'
export default {
    data: () => {
        return{
            nombre: 'Holi',
            cliente: Array
            
        }
    },
    methods:{
        ObtenerClientes: async function(){
            try {
                const response = await axios.get('/api/clientes')
                this.cliente = response.data
                console.log(response)
            } catch (error) {
                
            }
        }
    },
    created(){
        this.ObtenerClientes();
    }
}
</script>
