<template>
    <div class="contenedor-tabla">
            <h2>{{nameForm}}</h2>
            <div  id="contenedor-input"  v-for="(input, index) of inputs" :key="index" >
                <div class="contenedor-fila" v-for="(unit, indexUnit) of input" :key="indexUnit">
                    <p>{{unit.titulo}}</p>
                    <input  class="inputUnit" :placeholder="unit.titulo" :type="unit.type" :maxlength="unit.length" > 
                </div>                   
            </div>
        
        <div>
            <br>
            <input type="submit" value="Enviar">
        </div>
    </div> 
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
        return{

        }
    }
}
</script>


<style lang="scss" scoped>
#contenedor-input{
    display: flex;
    flex-wrap: nowrap;
    
}
.contenedor-fila{
    width: 100%;
    input{
        width: 100%;
    }
}

.inputUnit{
    margin: 5px;   
    border-radius: 4px;
    height: 25px;
    border: solid rgb(79, 70, 105);
}
</style>