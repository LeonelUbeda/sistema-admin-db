<template>
    <form class="contenedor-tabla"  >
            <h2>{{config.nameForm}}</h2>
            
            <div  id="contenedor-input"  v-for="(input, index) of config.inputs" :key="index" >
                <div class="contenedor-fila" v-for="(unit, indexUnit) of input" :key="indexUnit">
                    <p>{{unit.titulo}}</p>
                    <input  v-model="unit.valor"  :class="[ unit.valor>unit.length || unit.valor<0 ? 'pruebados' /*true*/  : 'prueba' /*false*/ ]" 
                    :placeholder="unit.titulo" :type="unit.type"  :maxlength="unit.length"  min="1" :max="unit.length" required > 
                </div>                   
            </div>
        
        <div>
            <br>
           
            <input type="submit" v-on:click="enviar" :value="config.nameButton" >
        </div>
    </form> 
</template>

<script>
import axios from 'axios'

export default {
    props: {
        config: {
            inputs: { type: Array, required: true  },
            nameForm: String, //Nombre que sale en el titulo
            nameButton: String, //Nombre del boton de enviar
        },
    },
    data: ()=>{
           props.config
    },
    methods:{
       enviar: function(){
           axios.post(
               '/api/clientes',
               /*F ME PEGUE*/ 

           )
       }
    }
}
</script>


<style  scoped>

.prueba{
    padding-top: 5px;
    outline: 0;
    height: 60%;
}
.prueba:focus{
    padding-top: 5px;
    border: solid green;
    height: 60%;
}
.pruebados{
    padding-top: 5px;
    height: 60%;
    outline: 0;
    border: solid red;
}
.pruebados:focus{
    padding-top: 5px;
    border: solid red;
    height: 60%;
}
#contenedor-input{
    display: flex;
 
    
}
.contenedor-fila{
    width: 100%;
    margin: 5px;
}

.inputUnit{
    margin: 5px;   
    border-radius: 4px;
    height: 25px;
    border: solid rgb(79, 70, 105);


}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  
}

</style>