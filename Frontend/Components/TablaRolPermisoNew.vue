<template>
    <div class="relative flex flex-col">
        <div v-if="bloquear === true && secciones.length > 0" class="absolute width-100" id="mensaje-bloqueado" style="z-index: 10000">
            <div>
                <h1 class="text-2xl">Selecciona un rol para editar</h1>
                
            </div>
        </div>
        <div class="flex items-center titulo">
            <h2 class="text-2xl">Editar Rol</h2>
            <div class="ml-auto">

                <input class="input-default ml-auto" style="max-width: 200px !important; min-width: 200px !important" type="text" v-model="rolEditar.nombre" v-if="!bloquear"> 
            </div>
          
           
        </div>
        <table :class="[{'blur': bloquear == true}, 'sombra']">
            <thead>
                <tr>
                    <th class="color-header-tabla" :key="titulo" v-for="titulo of titulos">{{titulo}}</th> <!-- Imprime los titulos que le pasas   -->
                </tr>
            </thead>
            <tbody v-if="secciones.length > 0">
                <tr v-for="(elemento, index) of secciones" :key="elemento.nombre">
                    <td class="color-black max">
                        {{elemento.nombre}}
                    </td>
                    
                    <td  v-for="(titulo, index2) of filterSection" :key="titulo">
                            <div class="input-container">

                                <input type="radio" :id="elemento.nombre + index2" 
                                :name="elemento.nombre" 
                                :value="index2" 
                                v-model="secciones[index].valor" 
                                >
                                
                                <!-- Ya ni me acuerdo pero se supone que esto: 
                                ((inputs[elemento.nombre] >= index2) && ((index2 != 0)) || (inputs[elemento.nombre] == index2))
                                hace la logica para que cuando seleccionas un permiso, se "deseleccione" el boton "ninguno"
                                
                                
                                -->
                              
                                <label :class="[ 
                                {selected: ((secciones[index].valor >= index2) && ((index2 != 0)) || (secciones[index].valor == index2)) },

                                {red: ((secciones[index].valor == 4) && (index2 == 4))}]" 
                                
                                :for="elemento.nombre + index2" ><div v-if="((secciones[index].valor >= index2) 
                                && ((index2 != 0)) || (secciones[index].valor == index2))" >SI</div>

                                <div v-else>No</div></label>
                            </div>

                        
                    </td>
                </tr>
            </tbody>
        </table>
            <div class="mensaje-rojo" v-if="secciones.length == 0">  
                <h2>No hay elementos!</h2>
            </div>
        <div class="ml-auto" v-if="secciones.length > 0  && bloquear == false">
            <input class="mt-2 btn-rojo" type="submit"  @click="eliminarEvento($event)" value="Eliminar">
            <input class="mt-2 btn-azul" type="submit"  @click="enviarEvento($event)" value="Guardar">
        </div>
        
    </div>
</template>


<script>
export default {
    props: {
        secciones: Array,
        titulos: Array,
        vacio: Boolean,
        valoresIniciales: Object,
        modo: String,
        bloquear: Boolean,
        rolEditar: Object
    },
    data: () => {
        return {
            inputs: []
        }
    },
    methods: {
        enviarEvento: function(evento){
            evento.preventDefault()
            this.$emit('terminado', this.secciones)
        },
        eliminarEvento: function(evento){
            evento.preventDefault()
            this.$emit('eliminar', this.rolEditar)
        }
    },
    computed: {
        filterSection: function(){
            return this.titulos.filter(function(title){
                if(title !== 'Seccion'){
                    return title
                }
            })
        },
    },
    watch: {
        
    }
}
</script>

<style lang="scss" scoped>


#mensaje-bloqueado{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: white, $alpha: 0.5);
    color: white;
    width: 100%;
    height: 100%;
    div{
        
        background-color: tomato;
        padding: 1px 50px;
    }
}

.max{
    max-width: 80px
}

.blocked{
    cursor:not-allowed
}

#btn-container{
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.btn-default{
    border: 2px solid #555861;
    width: auto;
    outline: 0;
    min-width: 130px;
    margin-right: 20px;
    margin-left: 0;
    padding: 7px 20px 7px 20px;
    border: 0;
    border-radius: 10px;
    background-color: #6a7cab;
    height: 40px !important;
    color: white;
    cursor: pointer
}


.input-container{
    display: flex;
    width: 70px;
    justify-content: center;
    margin: 0 auto 0 auto;
    border-radius: 20px;
}
.input-default{
    border: 2px solid #555861;
    width: 200px;
    min-width: 400px;
    outline: 0;
    margin-right: 20px;
    margin-left: 0;
    border-radius: 30px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 30px !important;
    color: #cacaca;
    color: white;
}

.input-container p {
    margin: 0
}
.input-container div{
    width: 100px;
    padding: 10px 8px 10px 8px
}

input[type="radio"]{display: none }
label{
    cursor: pointer;
}

.danger{
    background-color: #4b5976;
}

.selected{
    background-color: #85BDA6;
    color: white;
    transition: 1s;
}

input:checked + label {
    transition: 1s;
    
    background-color: rgb(104, 149, 167);
    background-color: #85BDA6;
    color: white;
    /*box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);*/
    border-color: #4B9DEA;
    z-index: 1;
}

.input-no-selected{
    background-color: #4b5976;
}

input + label{
    transition: 1s;
    background-color: #4b5976;
}

.red { 
    background-color: #e66f66 !important;
}
.border {
    border-radius: 6px;
   
}
.border-right {
    border-radius: 0 6px 6px 0;
    border-left: none;
}


table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}


table td, table th {
    
    height: 50px;
    padding: 8px 0px;
}

table tbody td{
    height: 60px;
}
table th{
    color:#dedfe0;
}
table td{
    background-color: #2a3141;
    background-color: white;
    color: black;
    color:#dedfe0;
    font-weight: 300 !important;
    border-left: 0;
    border-right: 0;

    
}
.color-black{
    color: black !important;
}
table th{
    max-width: 50px;
}


</style>