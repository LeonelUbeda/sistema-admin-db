<template>
    <form class="contenedor-tabla"  >
            <h2>{{nameForm}}</h2>
            
            <div  id="contenedor-input"  v-for="(input, index) of inputs" :key="index" >
                <div class="contenedor-fila" v-for="(unit, indexUnit) of input" :key="indexUnit">
                    <p>{{unit.titulo}}</p>
                    <input  v-model="unit.valor"  :class="[ unit.valor>unit.length || unit.valor<0 ? 'pruebados' /*true*/  : 'prueba' /*false*/ ]" 
                    :placeholder="unit.titulo" :type="unit.type"  :maxlength="unit.length"  min="1" :max="unit.length" > 
                </div>                   
            </div>
        
        <div>
            <br>
           
            <input type="submit" value="Enviar" >
        </div>
    </form> 
</template>

<script>
export default {
    props: {
        inputs: {
           type: Array, 
           required: true  
        },
        nameForm: String
    },
    data: ()=>{
           
    },
    methods:{
       
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





input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  
}

</style>