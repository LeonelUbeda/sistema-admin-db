<template>
    <form id="contenedor-tabla" class="">
        <div class="bloque-titulo flex items-center margin-b-20 sombra" v-if="config.mostrarTitulo"  >
            <h2 class="ml-8 text-xl">{{config.nameForm}}</h2>
        </div>
        <div class="bg-white sombra padding-x-20 padding-y-10">

            <div  class="contenedor-input"  v-for="input of config.inputs" :key="input" >
                <div v-for="unit of input" :key="unit" class="contenedor-filaprincipal" >
                    <div :class="[unit.uno == true ? 'contenedor-filauno': 'contenedor-fila']">
                           <p>{{unit.titulo}}</p>
                            <input  v-model="unit.valor"  
                            :class="[ unit.valor>unit.length || unit.valor<0 ? 'rojo' /*true*/  : 'verde' /*false*/ ]" 
                            :placeholder="unit.titulo" :type="unit.type"  :maxlength="unit.length"  min="1" :max="unit.length" 
                            required > 
                    </div>
                </div>                   
            </div>
            
            <div class="flex">
                <input type="submit" class="margin-left-auto ml-auto" v-on:click="enviar" :value="config.nameButton" >
            </div>
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
            mostrarTitulo: Boolean
        },
    },
    data: ()=>{
           return {

           }
    },
    methods:{
        enviar: function(){
            /*axios.post(
                '/api/clientes',
                

            )*/
        }
    }
}
</script>


<style lang="scss"  scoped>
#contenedor-tabla{
    width: 100%;
    
}
.contenedor-filauno{
    width: 50%;
}
.contenedor-fila{
    width: 100%;
}
.contenedor-filaprincipal{
    width: 100%;
    margin: 5px 10px;
}
.contenedor-input{
    margin-top: 10px;
    display: flex;
    input{
        width: 100%;
    }

}
.verde{
    padding-top: 5px;
    outline: 0;
    height: 60%;
}
.verde:focus{
    padding-top: 5px;
    border: 1px solid green;
    height: 60%;
}
.rojo{
    padding-top: 5px;
    height: 60%;
    outline: 0;
    border: solid red;
}
.rojo:focus{
    padding-top: 5px;
    border: solid red;
    height: 60%;
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

input[type=submit]{
    background:#398AD7;
    padding:15px 50px;  
    color: white;
    width: auto;
    margin-left: auto;
    cursor: pointer;
}
input {
	margin:10px 0 15px 0;
	padding:5px 10px;
	width:100%;
	outline:none;
	border:1px solid #bbb;
	border-radius:20px;
	display:inline-block;
	-webkit-box-sizing:border-box;
	   -moz-box-sizing:border-box;
	        box-sizing:border-box;
    -webkit-transition:0.2s ease all;
	   -moz-transition:0.2s ease all;
	    -ms-transition:0.2s ease all;
	     -o-transition:0.2s ease all;
	        transition:0.2s ease all;
}
</style>