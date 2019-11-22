<template>
    <form class="contenedor-tabla"  >
            <h2>{{nameForm}}</h2>
            <div  id="contenedor-input"  v-for="(input, index) of inputs" :key="index" >
                <div class="contenedor-fila" v-for="(unit, indexUnit) of input" :key="indexUnit">
                    <p>{{unit.titulo}}</p>
                    <input  v-model="unit.valor"  :class="[ unit.valor>unit.length || unit.valor<0 ? 'validado' /*true*/  : 'validadoVerde' /*false*/ ]" 
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


<style lang="scss" scoped>
#contenedor-input{
    display: flex;
 
    
}
.contenedor-fila{
    width: 100%;
  
}

.contenedor-tabla{
    
}

.validado{
  border-radius: 25px;
  margin: 5px;   
  height: 25px;  
    border-color: red;

}
.validado:focus{
    border-color: red;
        
}
.validadoVerde{
       border-radius: 25px;
    margin: 5px;   
    height: 25px;
   outline-width: 0;
   border-color:green;
}
.validadoVerde:focus{

     border-color:green;  
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>